import React, { useState } from 'react';
import ModalTopMobile from './modal-mobile-top';
import ModalMobileController from './modal-mobile-controller';
import { ScrollArea } from '@/components/ui/scroll-area';

const ModalMobileContent = () => {
  const [activeContentId, setActiveContentId] = useState<string>('1');

  const handleContentChange = (id: string) => {
    setActiveContentId(id);
  };

  return (
    <div className="flex flex-col gap-6 md:hidden justify-center pt-8">
      <ModalTopMobile onCardClick={handleContentChange} />
      <ScrollArea className="h-76 w-full">
        <ModalMobileController contentId={activeContentId} />
      </ScrollArea>
    </div>
  );
};

export default ModalMobileContent;
