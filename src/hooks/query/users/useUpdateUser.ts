import { useMutation } from '@tanstack/react-query';
import { UsersQuery } from '@/src/features/query';
import { UpdateUserDto } from '@/src/entities';

export function useUpdateUser(id: number) {
  const query = useMutation({
    mutationFn: (updateUserDto: UpdateUserDto) => (
      UsersQuery.updateUser(id, updateUserDto)
    ),
  });

  return query;
}
