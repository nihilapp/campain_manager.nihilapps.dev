import { useQuery } from '@tanstack/react-query';
import { UsersQuery } from '@/src/features/query';

export function useGetUsers() {
  const query = useQuery({
    queryKey: [ 'getUsers', ],
    queryFn: UsersQuery.getUsers,
  });

  return query;
}
