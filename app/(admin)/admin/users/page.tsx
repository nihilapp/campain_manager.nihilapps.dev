import React from 'react';
import { setMeta } from '@/src/utils';
import { UserAdmin } from '@/src/components';

export const metadata = setMeta({
  title: '',
  url: '/admin/users',
});

export default function page() {
  return (
    <>
      <UserAdmin />
    </>
  );
}
