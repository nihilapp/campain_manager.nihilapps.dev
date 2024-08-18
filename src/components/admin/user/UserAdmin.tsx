'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { nihilTool } from '@nihilapp/tools';
import { useCreateUser, useGetUsers, useUpdateUser } from '@/src/hooks/query';

interface Props {
  className?: ClassNameValue;
}

// TODO: 어드민 UI 테스트중
export function UserAdmin({ className, }: Props) {
  const users = useGetUsers();

  const createUser = useCreateUser();

  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  if (users.isLoading || users.isFetching) {
    return <>로딩중</>;
  }

  return (
    <>
      <div className={css.default}>
        {users.data.data.map((user) => (
          <div key={nihilTool.common.uuid()}>{nihilTool.common.string(user)}</div>
        ))}

        <button type='button'>asd</button>
      </div>
    </>
  );
}
