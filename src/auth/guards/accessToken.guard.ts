import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

/**
 * Guard for protecting routes with JWT access token authentication.
 * This guard is used to secure routes that require JWT access token validation.
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  /**
   * Custom canActivate method to handle public routes and token validation.
   * @param context - The execution context.
   * @returns A boolean indicating whether the route can be activated.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const publicRoutes: string[] = ['/auth/signup', '/auth/login', '/doc', '/'];

    // Allow access for public routes
    if (publicRoutes.includes(request.path)) {
      return true;
    }

    // Perform token validation for non-public routes
    return super.canActivate(context);
  }
}
