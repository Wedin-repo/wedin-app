'use client';

import Avatar from '@/components/Avatar';
import MenuItem from '@/components/MenuItem';
import { Button } from '@/components/ui/button';
import useOutsideClick from '@/hooks/useOutsideClick';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoGiftOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

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
        <div className="flex flex-row gap-4 items-center">
          <div className="hidden text-sm md:block">
            {`Hola ${currentUser?.name || currentUser?.email}!`}
          </div>
          <div
            className="flex flex-row gap-3 items-center p-4 rounded-full transition cursor-pointer md:py-1 md:px-2 hover:shadow-md border-[1px] border-neutral-200"
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
            className="px-5 h-9 rounded-full transition-all hover:text-white text-primaryTextColor shadow-black hover:bg-primaryBackgroundColor"
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
        <div className="overflow-hidden absolute right-0 top-12 text-sm bg-white rounded-xl shadow-md">
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
