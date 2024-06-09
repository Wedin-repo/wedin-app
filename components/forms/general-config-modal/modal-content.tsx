import React, { useState } from 'react';
import ModalLeft from './modal-left/modal-left';
import ModalRightController from './modal-right/modal-right-controller';

const ModalContent = () => {
  const [activeContentId, setActiveContentId] = useState<string>('1');

  const handleContentChange = (id: string) => {
    setActiveContentId(id);
  };

  return (
    <div className="flex-col gap-6 md:flex hidden">
      <div>
        <h1 className="font-medium text-[#1E293B] text-3xl">
          Configurar mi lista
        </h1>
        <div className="w-full border rounded-full border-borderColor mt-4"></div>
      </div>

      <div className="flex justify-between gap-6">
        <div className="w-1/2 flex flex-col justify-center">
          <ModalLeft onCardClick={handleContentChange} />
        </div>

        <div className="w-1/2">
          <ModalRightController contentId={activeContentId} />
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
