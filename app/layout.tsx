import { auth } from '@/auth';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import '../styles/global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wedin',
  description: 'Wedding Registry',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
