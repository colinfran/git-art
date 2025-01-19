'use client';

import { FC, ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

type Props = {
  children: ReactNode;
}

const Providers:FC<Props> = ({ children }) => {
  return <TooltipProvider>{children}</TooltipProvider>;
}

export default Providers
