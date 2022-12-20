import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  //Logger,
} from '@nestjs/common';

export class SessionGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    //console.log(request.session);
    // Logger.log('SessionGuard', 'SessionGuard');

    try {
      // Logger.log(request.session.passport.user, 'request.session.passport.user');
      if (request.session) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
