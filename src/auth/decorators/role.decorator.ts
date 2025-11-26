/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';



export const ROLE_KEY = 'roles';
export const Role = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
