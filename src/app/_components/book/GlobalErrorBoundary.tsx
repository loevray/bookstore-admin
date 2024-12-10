'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export const GlobalErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary fallback={<div>global error!</div>}>
      <Suspense fallback={<div>global loading...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
};
