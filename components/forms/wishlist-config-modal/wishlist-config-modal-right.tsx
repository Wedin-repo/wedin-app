'use client';

import EventDetailsForm from './event-details-form';
import EventUrlForm from './event-url-form';
import EventCoverImageForm from './event-cover-image-form';
import EventCoverMessageForm from './event-cover-message-form';
import EventDateForm from './event-date-form';
import BankDetailsForm from './bank-details-form';
import { getEvent } from '@/actions/data/event';

type WishlistConfigModalRightProps = {
  contentId: string | null;
};

const WishlistConfigModalRight = async ({
  contentId,
}: WishlistConfigModalRightProps) => {
  const event = await getEvent();

  if (contentId === '1') return <EventDetailsForm />;
  if (contentId === '2') return <EventUrlForm event={event} />;
  if (contentId === '3') return <EventCoverImageForm event={event} />;
  if (contentId === '4') return <EventCoverMessageForm event={event} />;
  if (contentId === '5') return <EventDateForm event={event} />;
  if (contentId === '6') return <BankDetailsForm />;
  return null;
};

export default WishlistConfigModalRight;
