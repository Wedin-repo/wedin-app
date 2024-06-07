import React, { useState, useEffect } from 'react';
import EventDetailsForm from './forms/event-details-form';
import EventUrlForm from './forms/event-url-form';
import EventCoverImageForm from './forms/event-cover-image-form';
import EventCoverMessageForm from './forms/event-cover-message-form';
import EventDateForm from './forms/event-date-form';
import BankDetailsForm from './forms/bank-details-form';
import { getEvent } from '@/actions/data/event';
import { Event, User } from '@prisma/client';
import Loader from '@/components/loader';
import GiftAmountsForm from './forms/gift-amounts-form';

type GeneralConfigModalRightProps = {
  contentId: string | null;
};

type EventType = Event & {
  eventPrimaryUser: User | null;
  eventSecondaryUser: User | null;
};

const GeneralConfigModalRight = ({
  contentId,
}: GeneralConfigModalRightProps) => {
  const [event, setEvent] = useState<EventType | null>(null);
  const [primaryUser, setPrimaryUser] = useState<User | null>(null);
  const [secondaryUser, setSecondaryUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEvent();
        if (!event) return;
        setEvent(event);
        setPrimaryUser(event?.eventPrimaryUser);
        setSecondaryUser(event?.eventSecondaryUser);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentId]);

  if (loading) {
    return <Loader mfHeight="h-full" />;
  }

  if (contentId === '1')
    return (
      <EventDetailsForm
        event={event}
        eventPrimaryUser={primaryUser}
        eventSecondaryUser={secondaryUser}
      />
    );
  if (contentId === '2') return <EventUrlForm event={event} />;
  if (contentId === '3') return <EventCoverImageForm event={event} />;
  if (contentId === '4') return <EventCoverMessageForm event={event} />;
  if (contentId === '5') return <EventDateForm event={event} />;
  if (contentId === '6') return <GiftAmountsForm event={event} />;
  if (contentId === '7') return <BankDetailsForm eventId={event?.id} />;
  return null;
};

export default GeneralConfigModalRight;
