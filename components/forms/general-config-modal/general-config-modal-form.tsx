import React, { useState, useEffect } from 'react';
import GeneralConfigModalLeft from './general-config-modal-left';
import { getEvent } from '@/actions/data/event';
import { Suspense } from 'react';
import GeneralConfigModalRight from './general-config-modal-right';
import Loader from '@/components/loader';
import { Event, User } from '@prisma/client';

type EventType = Event & {
  eventPrimaryUser: User | null;
  eventSecondaryUser: User | null;
};

const GeneralConfigModalForm = () => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [activeContentId, setActiveContentId] = useState<string>('1');

  const handleContentChange = (id: string) => {
    setActiveContentId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEvent();
        setEvent(event);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchData();
  }, []);

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
            {/* unsure about this suspense fallback */}
            {event && (
              <GeneralConfigModalRight
                contentId={activeContentId}
                event={event}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default GeneralConfigModalForm;
