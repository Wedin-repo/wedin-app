'use client';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import useOutsideClick from '@/hooks/useOutsideClick';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoGiftOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import MenuItem from '@/components/MenuItem';

type UserMenuProps = {
  currentUser?: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const router = useRouter();

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {currentUser ? (
        <div className="flex flex-row items-center gap-4">
          <div className="hidden md:block text-sm">
            {`Hola ${currentUser?.name || currentUser?.email}!`}
          </div>
          <div
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            onClick={toggleOpen}
          >
            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
            <IoIosArrowDown size={18} />
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => handleClick('/login')}
            className="text-primaryTextColor h-9 rounded-full px-5 hover:bg-primaryBackgroundColor hover:text-white transition-all shadow-black"
          >
            Login
          </Button>
          <Button
            onClick={() => handleClick('/register')}
            className="bg-[#E9E9E9] text-[#333333] h-9 rounded-full px-5 hover:opacity-80 transition-all shadow-sm"
          >
            Registrarme
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="absolute rounded-xl shadow-md bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem
              onClick={() => handleClick('/dashboard')}
              label="Mis regalos"
              icon={<IoGiftOutline fontSize={'18px'} />}
            />
            <MenuItem
              onClick={() => handleClick('/dashboard')}
              label="Mi perfil"
              icon={<IoSettingsOutline fontSize={'18px'} />}
            />
            <hr />
            <MenuItem
              variant="logoutButton"
              label="Cerrar sesión"
              icon={<MdLogout fontSize={'18px'} />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
