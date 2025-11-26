/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators/role.decorator';
import { UserRole } from '@prisma/client';
import { User } from 'src/users/types/users.types';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private reflextor: Reflector,
  ) { };

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflextor.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context?.getClass(), context.getHandler()
    ]);

    if (!roles) return false;

    const { user }: { user: User } = context.switchToHttp().getRequest();

    const isHasRole = roles?.some(r => r === user?.role);

    return isHasRole;
  }
}
