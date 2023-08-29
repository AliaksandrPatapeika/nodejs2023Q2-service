import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard for local authentication using Passport.
 * This guard is used to protect routes that require local authentication.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
