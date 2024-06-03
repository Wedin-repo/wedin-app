import { getEvent } from '@/actions/data/event';
import EventDetailsForm from './forms/event-details-form';
import EventUrlForm from './forms/event-url-form';
import EventCoverImageForm from './forms/event-cover-image-form';
import EventCoverMessageForm from './forms/event-cover-message-form';
import EventDateForm from './forms/event-date-form';
import BankDetailsForm from './forms/bank-details-form';
import { getCurrentUser } from '@/actions/get-current-user';

type GeneralConfigModalRightProps = {
  contentId: string | null;
};

const GeneralConfigModalRight = async ({
  contentId,
}: GeneralConfigModalRightProps) => {
  const event = await getEvent();

  if (!event) return null;
  //const currentUser = await getCurrentUser();

  if (contentId === '1') return <EventDetailsForm event={event} />;
  if (contentId === '2') return <EventUrlForm event={event} />;
  if (contentId === '3') return <EventCoverImageForm event={event} />;
  if (contentId === '4') return <EventCoverMessageForm event={event} />;
  if (contentId === '5') return <EventDateForm event={event} />;
  if (contentId === '7') return <BankDetailsForm />;
  return null;
};

export default GeneralConfigModalRight;
