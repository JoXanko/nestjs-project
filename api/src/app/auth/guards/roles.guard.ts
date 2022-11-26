import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Type } from 'src/app/entities/user/type';
import { User } from 'src/app/entities/user/user.entity';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.get<Type>('role', context.getHandler());

    const { user }: { user: User } = context.switchToHttp().getRequest();

    return requiredRole === user.role;
  }
}
