'use client';

import dynamic from 'next/dynamic';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../logo';

const UserMenu = dynamic(() => import('@/components/navbar/user-menu'), {
  ssr: false,
});

type NavBarProps = {
  currentUser?: User | null;
};

export const NavBar = ({ currentUser }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  let menuValue = 'gifts';

  // The only case where this will run or the session.user.valid == false
  // is when you are logged in but the user have been deleted from our db
  // this will sign out the user
  // useEffect(() => {
  //   if (session && !currentUser)   {
  //     signOut();
  //     router.push('/login');
  //   }
  // }, [session, currentUser, router]);
  // console.log('currentUser', currentUser);

  if (pathname.includes('/gifts-received')) {
    menuValue = 'gifts-received';
  } else if (pathname.includes('/dashboard') || pathname.includes('/events')) {
    menuValue = 'dashboard';
  }

  const handleTabChange = (value: string) => {
    router.push(`/${value}`);
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
            defaultValue="gifts"
            onValueChange={handleTabChange}
            value={menuValue}
          >
            <TabsList className="overflow-x-auto overflow-y-hidden gap-4">
              <TabsTrigger value="gifts" className="!text-sm pb-4">
                Agregar regalos
              </TabsTrigger>
              {currentUser && (
                <>
                  <TabsTrigger value="dashboard" className="!text-sm pb-4">
                    Mi lista
                  </TabsTrigger>
                  <TabsTrigger value="gifts-received" className="!text-sm pb-4">
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
