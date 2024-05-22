'use client';

import UserMenu from '@/components/navbar/user-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { User } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../logo';

type NavBarProps = {
  currentUser?: User | null;
};

export const AdminNavBar = ({ currentUser }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  let menuValue = 'transactions';

  if (pathname.includes('/transactions')) {
    menuValue = 'transactions';
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
            defaultValue="transactions"
            onValueChange={handleTabChange}
          >
            <TabsList className="overflow-x-auto overflow-y-hidden gap-4">
              {currentUser && (
                <>
                  <TabsTrigger value="transactions" className="!text-sm pb-4">
                    Transacciones
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

export default AdminNavBar;
