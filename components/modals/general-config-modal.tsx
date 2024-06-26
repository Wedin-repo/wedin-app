'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { IoSettingsOutline } from 'react-icons/io5';
import ModalContent from '../forms/general-config-modal/modal-content';
import ModalMobileContent from '../forms/general-config-modal/mobile/modal-mobile-content';

const GeneralConfigModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2 text-primaryTextColor font-normal hover:shadow transition-all">
          <IoSettingsOutline fontSize={'18px'} />
          Configurar mi lista
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl !max-w-5xl">
        <ModalContent />
        <ModalMobileContent />
      </DialogContent>
    </Dialog>
  );
};

export default GeneralConfigModal;
