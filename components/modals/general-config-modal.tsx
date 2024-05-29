'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IoSettingsOutline } from 'react-icons/io5';
import GeneralConfigModalForm from '../forms/general-config-modal/general-config-modal-form';

const WishlistConfigModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2 text-primaryTextColor font-normal hover:shadow transition-all">
          <IoSettingsOutline fontSize={'18px'} />
          Configurar mi lista
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl !max-w-5xl">
        <GeneralConfigModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default WishlistConfigModal;
