'use client';

import MenuItem from '@/components/navbar/menu-item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { IoIosArrowDown } from 'react-icons/io';
import { IoGiftOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import Avatar from './avatar';

type UserMenuProps = {
  currentUser?: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();

  return (
    <>
      {currentUser ? (
        <div className="flex flex-row gap-4 items-center">
          <div className="hidden text-sm md:block">
            <p>{`Hola ${currentUser.name || currentUser.email}!`}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row gap-3 items-center p-4 rounded-full transition cursor-pointer md:py-1 md:px-2 hover:shadow-md border-[1px] border-neutral-200">
                <div className="hidden md:block">
                  <Avatar src={currentUser.image} />
                </div>

                <IoIosArrowDown size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem>
                <MenuItem
                  onClick={() => router.push('/dashboard')}
                  label="Mis regalos"
                  icon={<IoGiftOutline fontSize={'18px'} />}
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MenuItem
                  onClick={() => router.push('/dashboard')}
                  label="Mi perfil"
                  icon={<IoSettingsOutline fontSize={'18px'} />}
                />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <MenuItem
                  variant="logoutButton"
                  label="Cerrar sesión"
                  icon={<MdLogout fontSize={'18px'} />}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => router.push('/login')}
            className="px-5 h-9 rounded-full transition-all hover:text-white text-primaryTextColor shadow-black hover:bg-primaryBackgroundColor"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push('/register')}
            className="bg-[#E9E9E9] text-[#333333] h-9 rounded-full px-5 hover:opacity-80 transition-all shadow-sm"
          >
            Registrarme
          </Button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
