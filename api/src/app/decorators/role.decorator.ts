import { SetMetadata } from '@nestjs/common';
import { Type as RoleEnum } from '../entities/user/type';

export const Role = (role: RoleEnum) => SetMetadata('role', role);
