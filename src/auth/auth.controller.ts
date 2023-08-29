import {
  Body,
  Controller,
  HttpCode,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UserEntity } from '../entities';
import { JwtTokens, Token } from '../interfaces';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard, RefreshTokenGuard } from './guards';

/**
 * Controller responsible for user authentication.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user.
   * @param {CreateUserDto} createUserDto - User data.
   * @returns {Promise<UserEntity>} The newly registered user.
   */
  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.authService.signup(createUserDto);
  }

  /**
   * Log in user.
   * @param {Request} request - The incoming request.
   * @returns {Promise<JwtTokens>} JWT tokens.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Request() request): Promise<JwtTokens> {
    return await this.authService.login(request.user);
  }

  /**
   * Refresh JWT tokens.
   * @param {Token} body - The request body containing the refresh token.
   * @returns {Promise<JwtTokens>} New JWT tokens.
   */
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() { refreshToken }: Token): Promise<JwtTokens> {
    return await this.authService.refresh(refreshToken);
  }
}
