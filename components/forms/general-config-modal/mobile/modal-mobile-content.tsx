import React, { useState } from 'react';
import ModalTopMobile from './modal-mobile-top';
import { ScrollArea } from '@/components/ui/scroll-area';
import ModalController from '../modal-controller';

const ModalMobileContent = () => {
  const [activeContentId, setActiveContentId] = useState<string>('1');

  const handleContentChange = (id: string) => {
    setActiveContentId(id);
  };

  return (
    <div className="flex flex-col gap-6 md:hidden justify-center pt-4">
      <ModalTopMobile onCardClick={handleContentChange} />
      <ScrollArea /* className='max-h-96' */>
        <ModalController contentId={activeContentId} />
      </ScrollArea>
    </div>
  );
};

export default ModalMobileContent;
