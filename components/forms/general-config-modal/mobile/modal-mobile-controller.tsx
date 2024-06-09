import React, { useState, useEffect } from 'react';
import EventDetailsForm from '../modal-right/forms/event-details-form';
import EventUrlForm from '../modal-right/forms/event-url-form';
import EventCoverImageForm from '../modal-right/forms/event-cover-image-form';
import EventCoverMessageForm from '../modal-right/forms/event-cover-message-form';
import EventDateForm from '../modal-right/forms/event-date-form';
import BankDetailsForm from '../modal-right/forms/bank-details-form';
import { getEvent } from '@/actions/data/event';
import { Event, User, BankDetails } from '@prisma/client';
import Loader from '@/components/loader';
import GiftAmountsForm from '../modal-right/forms/gift-amounts-form';

type ModalMobileControllerProps = {
  contentId: string | null;
};

const ModalMobileController = ({ contentId }: ModalMobileControllerProps) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [primaryUser, setPrimaryUser] = useState<User | null>(null);
  const [secondaryUser, setSecondaryUser] = useState<User | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEvent();
        if (!event) return;
        setEvent(event);
        setPrimaryUser(event?.eventPrimaryUser);
        setSecondaryUser(event?.eventSecondaryUser);
        setBankDetails(event?.bankDetails);
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
  if (contentId === '7')
    return <BankDetailsForm eventId={event?.id} bankDetails={bankDetails} />;
  return null;
};

export default ModalMobileController;
