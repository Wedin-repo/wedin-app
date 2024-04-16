'use client';

import { Switch } from '@/components/ui/switch';
import React from 'react';
import { IoIosLink } from 'react-icons/io';
import { IoGiftOutline } from 'react-icons/io5';
import { LuScreenShare } from 'react-icons/lu';
import { PiWallet } from 'react-icons/pi';

type DashboardHeaderProps = {
  quantity: number | undefined;
  formattedTotalPrice: string | null;
};

function DashboardHeader({ quantity, formattedTotalPrice }: DashboardHeaderProps) {

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h1 className="text-4xl font-semibold text-primaryTextColor">Mi lista</h1>
      <div className="flex items-center gap-3">
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-md flex items-center gap-2">
          <IoGiftOutline fontSize={'18px'} />
          {quantity} regalos
        </div>
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-md flex items-center gap-2">
          <PiWallet fontSize={'18px'} />
          {formattedTotalPrice}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start sm:justify-center w-full gap-4">
        <div className="flex items-center gap-2">
          <Switch id="makeVisible" />
          Lista visible a los invitados
        </div>
        <div className="flex items-center gap-2">
          <IoIosLink fontSize={'18px'} />
          Compartir link de la lista
        </div>
        <div className="flex items-center gap-2">
          <LuScreenShare fontSize={'18px'} />
          Ver como un invitado
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
