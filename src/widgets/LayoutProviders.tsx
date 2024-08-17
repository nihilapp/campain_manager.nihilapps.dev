'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { enableCache } from '@iconify/react';

enableCache('local');

interface Props {
  children: React.ReactNode;
  className?: ClassNameValue;
}

export function LayoutProviders({ children, className, }: Props) {
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <>
      <div className={css.default}>{children}</div>
    </>
  );
}
