import { useMutation } from '@tanstack/react-query';
import { UsersQuery } from '@/src/features/query';
import { CreateUserDto } from '@/src/entities';

export function useCreateUser() {
  const query = useMutation({
    mutationFn: (createUserDto: CreateUserDto) => (
      UsersQuery.createUser(createUserDto)
    ),
  });

  return query;
}
