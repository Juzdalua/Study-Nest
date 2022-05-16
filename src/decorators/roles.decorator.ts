import { SetMetadata } from '@nestjs/common';
import { Role } from '../auth/role.enum';

export const ROLES_KEY = 'roles';
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);    // @Roles(Role.Admin)
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);     // @Roles('admin')