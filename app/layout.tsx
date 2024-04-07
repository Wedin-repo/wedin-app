import type { Metadata } from 'next';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { Toaster } from '@/components/ui/toaster';
import NavBar from '@/components/navbar/Navbar';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/Footer';
import './globals.css';
import { redirect } from 'next/navigation';

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
  console.log("layout", currentUser);

  /* if (currentUser && currentUser.isOnboarded === false) {
    redirect('/onboarding');
  } */

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <NavBar currentUser={currentUser} />
        <div className="pt-16 pb-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
