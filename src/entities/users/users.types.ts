import { UserRole } from '@prisma/client';

export interface CreateUserDto {
  userEmail: string;
  userName: string;
  userRole?: UserRole;
  password: string;
}
