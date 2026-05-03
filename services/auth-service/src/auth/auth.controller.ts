import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto, SendOtpDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { ok } from '@hamrotourist/shared-types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send registration OTP to email' })
  async sendOtp(@Body() dto: SendOtpDto) {
    await this.authService.startRegistration(dto.email);
    return ok({ message: 'OTP sent' });
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user with OTP verification' })
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.register(dto);
    this.setRefreshCookie(res, result.refreshToken);
    return ok({ accessToken: result.accessToken, user: result.user });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);
    this.setRefreshCookie(res, result.refreshToken);
    return ok({ accessToken: result.accessToken, user: result.user });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Body() dto: RefreshDto, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refresh(dto.refreshToken);
    this.setRefreshCookie(res, tokens.refreshToken);
    return ok({ accessToken: tokens.accessToken });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout and revoke refresh tokens' })
  async logout(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.clearCookie('refresh_token');
    return ok({ message: 'Logged out' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async me(@CurrentUser('id') userId: string) {
    const user = await this.authService.getProfile(userId);
    return ok({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      tenantSlug: user.tenantSlug,
      isEmailVerified: user.isEmailVerified,
    });
  }

  @Patch('tenant')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign tenant slug to current user (internal-style)' })
  async assignTenant(
    @CurrentUser('id') userId: string,
    @Body('tenantSlug') tenantSlug: string,
  ) {
    const user = await this.authService.assignTenant(userId, tenantSlug);
    return ok({ tenantSlug: user.tenantSlug });
  }

  private setRefreshCookie(res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }
}
