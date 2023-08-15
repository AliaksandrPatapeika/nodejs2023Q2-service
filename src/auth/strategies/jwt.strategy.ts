import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANTS } from 'src/constants';

/**
 * JWT passport strategy for authenticating users.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_CONSTANTS.JWT_SECRET_KEY),
    });
  }

  /**
   * Validate JWT payload.
   * @param userId - User's ID from JWT payload.
   * @param login - User's login from JWT payload.
   * @returns The validated user.
   */
  async validate({ userId, login }) {
    return { userId, login };
  }
}
