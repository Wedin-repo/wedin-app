import { getCurrentUser } from '@/actions/getCurrentUser';
import { auth } from '@/auth';
import Footer from '@/components/Footer';
import NavBar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';

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
  const currentUser = await getCurrentUser();
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <NavBar currentUser={currentUser} />
          <div className="pt-16 pb-10">{children}</div>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
