'use client';

import { ReactNode } from 'react';
import ScrollProgressBar from './ScrollProgressBar';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgressBar />
      {children}
    </>
  );
}