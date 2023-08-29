import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard for refreshing JWT tokens using Passport.
 * This guard is used to protect routes that handle token refreshing.
 */
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}
