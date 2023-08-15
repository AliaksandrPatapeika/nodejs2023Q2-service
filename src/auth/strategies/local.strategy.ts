import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../entities';
import { ERROR_MESSAGES, LOGIN_FIELD } from 'src/constants';

/**
 * Local passport strategy for authenticating users.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: LOGIN_FIELD });
  }

  /**
   * Validate user credentials.
   * @param login - User's login.
   * @param password - User's password.
   * @returns The validated user.
   */
  async validate(login: string, password: string): Promise<UserEntity> {
    this.validateCredentials(login, password);

    const user: UserEntity = await this.authService.validateUser({
      login,
      password,
    });

    if (!user) {
      throw new ForbiddenException(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    return user;
  }

  private validateCredentials(login: string, password: string): void {
    const isLoginString = typeof login === 'string';
    const isPasswordString = typeof password === 'string';
    const isLoginNotEmpty = !!login;
    const isPasswordNotEmpty = !!password;

    if (
      !isLoginString ||
      !isPasswordString ||
      !isLoginNotEmpty ||
      !isPasswordNotEmpty
    ) {
      throw new BadRequestException(ERROR_MESSAGES.BAD_REQUEST);
    }
  }
}
