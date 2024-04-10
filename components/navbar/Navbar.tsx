'use client';

import Container from '@/components/Container';
import UserMenu from '@/components/navbar/UserMenu';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type NavBarProps = {
  currentUser?: User | null;
};

export const NavBar = ({ currentUser }: NavBarProps) => {
  const pathname = usePathname();

  if (
    pathname.includes('/login') ||
    pathname.includes('/register') ||
    pathname.includes('/onboarding')
  ) {
    return <></>;
  }

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 px-6 sm:px-10">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex gap-4 items-center">
              <Logo />
              <Tabs className="">
                <TabsList className="gap-4 overflow-x-auto overflow-y-hidden">
                  <TabsTrigger value="myList" className="!text-sm">
                    Mi lista
                  </TabsTrigger>
                  <TabsTrigger value="addGifts" className="!text-sm">
                    Agregar regalos
                  </TabsTrigger>
                  <TabsTrigger value="giftsRecieved" className="!text-sm">
                    Regalos recibidos
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
