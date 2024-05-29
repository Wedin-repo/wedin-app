import React, { useState } from 'react';
import GeneralConfigModalLeft from './general-config-modal-left';
import { Suspense } from 'react';
import GeneralConfigModalRight from './general-config-modal-right';
import Loader from '@/components/loader';

const GeneralConfigModalForm = () => {
  const [activeContentId, setActiveContentId] = useState<string>('1');

  const handleContentChange = (id: string) => {
    setActiveContentId(id);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-medium text-[#1E293B] text-3xl">
          Configurar mi lista
        </h1>
        <div className="w-full border rounded-full border-borderColor mt-4"></div>
      </div>

      <div className="flex justify-between pt-4 gap-6">
        <div className="w-1/2 flex flex-col justify-center">
          <GeneralConfigModalLeft onCardClick={handleContentChange} />
        </div>

        <div className="w-1/2">
          <Suspense fallback={<Loader mfHeight="h-full" />}>
            <GeneralConfigModalRight contentId={activeContentId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default GeneralConfigModalForm;
