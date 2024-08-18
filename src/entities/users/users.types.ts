import { UserRole } from '@prisma/client';

export interface UserTokenInfo {
  userEmail: string;
  userName: string;
  userRole: UserRole;
}

export interface CreateUserDto {
  userEmail: string;
  userName: string;
  userRole?: UserRole;
  password: string;
}

export interface UpdateUserDto {
  uid: string;
  userEmail?: string;
  userName?: string;
}

export interface AdminUpdateUserDto {
  userEmail?: string;
  userName?: string;
  userRole?: UserRole;
}

export interface NewPasswordDto {
  uid: string;
  password: string;
  newPassword: string;
}
