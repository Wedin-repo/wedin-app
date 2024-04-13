'use client';

import Container from '@/components/Container';
import UserMenu from '@/components/navbar/UserMenu';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

type NavBarProps = {
  currentUser?: User | null;
};

export const NavBar = ({ currentUser }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  let menuValue;

  if (pathname.includes('/gifts')) {
    menuValue = 'addGifts';
  } else if (pathname.includes('/gifts-received')) {
    menuValue = 'giftsRecieved';
  } else if (pathname.includes('/dashboard')) {
    menuValue = 'myList';
  }

  //console.log(menuValue)

  if (!currentUser) {
    console.log("first")
  }


  const handleTabChange = (value: string) => {
    let url = '/';
    switch (value) {
      case 'myList':
        url = '/dashboard';
        break;
      case 'addGifts':
        url = '/gifts';
        break;
      case 'giftsRecieved':
        url = '/gifts-received';
        break;
      default:
        break;
    }
    router.push(url);
  };

  if (
    pathname.includes('/login') ||
    pathname.includes('/register') ||
    pathname.includes('/onboarding')
  ) {
    return <></>;
  }

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="pt-4 px-6 sm:px-10">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <div className="flex gap-4 items-center">
              <div className='pb-4'>
                <Logo />
              </div>

              <Tabs className="mb-[-8px] hidden sm:block" onValueChange={handleTabChange} defaultValue={menuValue}>
                <TabsList className="gap-4 overflow-x-auto overflow-y-hidden">
                  {currentUser && (
                    <TabsTrigger value="myList" className="!text-sm pb-4">
                      Mi lista
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="addGifts" className="!text-sm pb-4">
                    Agregar regalos
                  </TabsTrigger>
                  {currentUser && (
                    <TabsTrigger value="giftsRecieved" className="!text-sm pb-4">
                      Regalos recibidos
                    </TabsTrigger>
                  )}
                </TabsList>
              </Tabs>
            </div>
            <div className='pb-4'>
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
