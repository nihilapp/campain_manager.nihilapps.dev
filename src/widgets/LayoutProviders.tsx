'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { enableCache } from '@iconify/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

enableCache('local');

interface Props {
  children: React.ReactNode;
  className?: ClassNameValue;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 60 * 10 * 1000,
      gcTime: 60 * 12 * 1000,
    },
    mutations: {
      retry: false,
      gcTime: 60 * 12 * 1000,
    },
  },
});

export function LayoutProviders({ children, className, }: Props) {
  const css = {
    default: twJoin([
      ``,
      className,
    ]),
  };

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position='bottom' />
    </QueryClientProvider>
  );
}
