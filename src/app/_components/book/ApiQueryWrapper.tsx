'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function ApiQueryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('apiqueryerror 실행됨');
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={() => <div>api query error</div>}
        >
          <Suspense fallback={<div>api query loading...</div>}>
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
