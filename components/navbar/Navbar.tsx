'use client';

import Logo from '@/components/Logo';
import UserMenu from '@/components/navbar/UserMenu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { User } from '@prisma/client';
import type { Session } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';

type NavBarProps = {
  currentUser?: User | null;
  session?: Session | null;
};

export const NavBar = ({ currentUser }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  let menuValue = 'addGifts';

  // The only case where this will run or the session.user.valid == false
  // is when you are logged in but the user have been deleted from our db
  // this will sign out the user
  // useEffect(() => {
  //   if (session && !currentUser)   {
  //     signOut();
  //     router.push('/login');
  //   }
  // }, [session, currentUser, router]);

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
    <div className="fixed z-10 px-6 pt-4 w-full bg-white shadow-sm sm:px-10">
      <div className="flex flex-row gap-3 justify-between items-center md:gap-0">
        <div className="flex gap-4 items-center">
          <div className="pb-4">
            <Logo width={90} />
          </div>

          <Tabs
            className="hidden sm:block mb-[-8px]"
            defaultValue="addGifts"
            onValueChange={handleTabChange}
            value={menuValue}
          >
            <TabsList className="overflow-x-auto overflow-y-hidden gap-4">
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
