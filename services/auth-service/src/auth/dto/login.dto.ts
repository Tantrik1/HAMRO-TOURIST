import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  // No MinLength here on purpose: login should never enforce password complexity
  // (only registration does). A short, wrong password must surface as "Invalid credentials",
  // not as a validation error that leaks the rule.
  @ApiProperty({ example: 'StrongPass123!' })
  @IsString()
  password: string;
}
