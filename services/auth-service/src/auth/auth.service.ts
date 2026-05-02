import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../entities/user.entity';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { OtpService } from './otp.service';
import type { JwtPayload, AuthTokens } from '@hamrotourist/shared-types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly SALT_ROUNDS = 12;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepo: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly otpService: OtpService,
  ) {}

  async startRegistration(email: string): Promise<void> {
    const existing = await this.userRepo.findOne({
      where: { email: email.toLowerCase() },
    });
    if (existing && existing.isEmailVerified) {
      throw new ConflictException('Email already registered');
    }
    await this.otpService.sendOtp(email, 'register');
  }

  async register(dto: RegisterDto): Promise<AuthTokens & { user: { id: string; email: string; firstName: string; lastName: string; isEmailVerified: boolean; tenantSlug: string | null } }> {
    const verified = await this.otpService.verifyOtp(dto.email, dto.otp, 'register');
    if (!verified) {
      throw new BadRequestException({ code: 'INVALID_OTP', message: 'Invalid or expired verification code' });
    }

    const existing = await this.userRepo.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      if (existing.isEmailVerified) {
        throw new ConflictException('Email already registered');
      }
      // Update unverified user record
      existing.firstName = dto.firstName;
      existing.lastName = dto.lastName;
      existing.passwordHash = await bcrypt.hash(dto.password, this.SALT_ROUNDS);
      existing.isEmailVerified = true;
      await this.userRepo.save(existing);
      this.logger.log(`User re-registered & verified: ${existing.email}`);
      const tokens = await this.generateTokens(existing);
      return { ...tokens, user: this.publicUser(existing) };
    }

    const passwordHash = await bcrypt.hash(dto.password, this.SALT_ROUNDS);
    const user = this.userRepo.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      isEmailVerified: true,
    });
    await this.userRepo.save(user);
    this.logger.log(`User registered: ${user.email}`);
    const tokens = await this.generateTokens(user);
    return { ...tokens, user: this.publicUser(user) };
  }

  async login(dto: LoginDto): Promise<AuthTokens & { user: { id: string; email: string; firstName: string; lastName: string; isEmailVerified: boolean; tenantSlug: string | null } }> {
    const user = await this.userRepo.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User logged in: ${user.email}`);
    const tokens = await this.generateTokens(user);
    return { ...tokens, user: this.publicUser(user) };
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const storedTokens = await this.refreshTokenRepo.find({
      where: { isRevoked: false },
      relations: ['user'],
    });

    let matchedToken: RefreshTokenEntity | null = null;
    for (const stored of storedTokens) {
      const isMatch = await bcrypt.compare(refreshToken, stored.tokenHash);
      if (isMatch && stored.expiresAt > new Date()) {
        matchedToken = stored;
        break;
      }
    }

    if (!matchedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    matchedToken.isRevoked = true;
    await this.refreshTokenRepo.save(matchedToken);

    return this.generateTokens(matchedToken.user);
  }

  async logout(userId: string): Promise<void> {
    await this.refreshTokenRepo.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
    this.logger.log(`User logged out: ${userId}`);
  }

  async getProfile(userId: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async assignTenant(userId: string, tenantSlug: string): Promise<UserEntity> {
    const user = await this.getProfile(userId);
    user.tenantSlug = tenantSlug;
    await this.userRepo.save(user);
    return user;
  }

  private publicUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isEmailVerified: user.isEmailVerified,
      tenantSlug: user.tenantSlug,
    };
  }

  private async generateTokens(user: UserEntity): Promise<AuthTokens> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantSlug: user.tenantSlug,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = uuidv4();
    const refreshHash = await bcrypt.hash(refreshToken, this.SALT_ROUNDS);
    const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY', '30d');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (parseInt(refreshExpiry) || 30));

    await this.refreshTokenRepo.save({
      userId: user.id,
      tokenHash: refreshHash,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }
}
