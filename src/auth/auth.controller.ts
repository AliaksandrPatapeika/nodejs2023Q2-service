import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UserEntity } from '../entities';
import { JwtTokens } from '../interfaces';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

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
   * @returns {Promise<JwtTokens>} JWT tokens.
   */
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(): Promise<JwtTokens> {
    return await this.authService.login();
  }

  /**
   * Refresh JWT tokens.
   * @returns {Promise<JwtTokens>} New JWT tokens.
   */
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(): Promise<JwtTokens> {
    return await this.authService.refresh();
  }
}
