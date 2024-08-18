import { User } from '@prisma/client';
import { Api } from '@/src/utils';
import { CreateUserDto, UpdateUserDto } from '@/src/entities';

export class UsersQuery {
  static async getUsers() {
    const { data, } = await Api.get<User[]>(
      '/users'
    );

    return data;
  }

  static async getUserById(id: number) {
    const { data, } = await Api.get<User>(
      `/users/${id}`
    );

    return data;
  }

  static async createUser(createUserDto: CreateUserDto) {
    const { data, } = await Api.post<User, CreateUserDto>(
      '/users',
      createUserDto
    );

    return data;
  }

  static async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { data, } = await Api.patch<User, UpdateUserDto>(
      `/users/${id}`,
      updateUserDto
    );

    return data;
  }

  static async deleteUser(id: number) {
    const { data, } = await Api.delete<User>(
      `/users/${id}`
    );

    return data;
  }
}
