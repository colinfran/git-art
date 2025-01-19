import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { FC, ReactNode } from 'react';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, and Prettier.'
};

type Props = {
  children: ReactNode;
}

const RootLayout:FC<Props> = ({children}) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}

export default RootLayout;
