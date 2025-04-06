// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post('request-password-reset')
  // @ApiOperation({ summary: 'Request password reset' })
  // @ApiResponse({ status: 200, description: 'Reset email sent' })
  // async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDto) {
  //   await this.authService.requestPasswordReset(requestPasswordResetDto.email);
  //   return { message: 'Password reset email sent' };
  // }

  // @Post('reset-password')
  // @ApiOperation({ summary: 'Reset password' })
  // @ApiResponse({ status: 200, description: 'Password reset successful' })
  // async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
  //   await this.authService.resetPassword(
  //     resetPasswordDto.token,
  //     resetPasswordDto.newPassword
  //   );
  //   return { message: 'Password reset successfully' };
  // }
}
