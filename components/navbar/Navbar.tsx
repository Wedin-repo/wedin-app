'use client';

import Logo from '@/components/Logo';
import UserMenu from '@/components/navbar/UserMenu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';

type NavBarProps = {
  currentUser?: User | null;
};

export const NavBar = ({ currentUser }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  let menuValue = 'addGifts';

  if (pathname.includes('/gifts-received')) {
    menuValue = 'giftsRecieved';
  } else if (pathname.includes('/dashboard')) {
    menuValue = 'myList';
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

  return (
    <div className="fixed w-full bg-white z-10 pt-4 px-6 shadow-sm sm:px-10">
      <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
        <div className="flex gap-4 items-center">
          <div className="pb-4">
            <Logo height={39} width={90} />
          </div>

          <Tabs
            className="mb-[-8px] hidden sm:block"
            defaultValue="addGifts"
            onValueChange={handleTabChange}
            value={menuValue}
          >
            <TabsList className="gap-4 overflow-x-auto overflow-y-hidden">
              <TabsTrigger value="addGifts" className="!text-sm pb-4">
                Agregar regalos
              </TabsTrigger>
              {currentUser && (
                <>
                  <TabsTrigger value="myList" className="!text-sm pb-4">
                    Mi lista
                  </TabsTrigger>
                  <TabsTrigger value="giftsRecieved" className="!text-sm pb-4">
                    Regalos recibidos
                  </TabsTrigger>
                </>
              )}
            </TabsList>
          </Tabs>
        </div>
        <div className="pb-4">
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
