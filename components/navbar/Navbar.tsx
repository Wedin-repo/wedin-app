'use client';

import Container from '@/components/Container';
import UserMenu from '@/components/navbar/UserMenu';
import { User } from '@prisma/client';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const inter = Inter({ subsets: ['latin'] });

type NavBarProps = {
  currentUser?: User | null;
};

export const NavBar = ({ currentUser }: NavBarProps) => {
  const pathname = usePathname();

  console.log("navbar component", currentUser);

  if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/onboarding') ) {
    return <></>;
  }

  return (
    <div className={`fixed w-full bg-white z-10 shadow-sm ${inter.className}`}>
      <div className="py-4 px-6 sm:px-10">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
