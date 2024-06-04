import EventDetailsForm from './forms/event-details-form';
import EventUrlForm from './forms/event-url-form';
import EventCoverImageForm from './forms/event-cover-image-form';
import EventCoverMessageForm from './forms/event-cover-message-form';
import EventDateForm from './forms/event-date-form';
import BankDetailsForm from './forms/bank-details-form';
import { Event, User } from '@prisma/client';

type GeneralConfigModalRightProps = {
  contentId: string | null;
  event: Event & {
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
};

const GeneralConfigModalRight = ({
  contentId,
  event,
}: GeneralConfigModalRightProps) => {
  const { eventPrimaryUser, eventSecondaryUser } = event;

  if (contentId === '1')
    return (
      <EventDetailsForm
        event={event}
        eventPrimaryUser={eventPrimaryUser}
        eventSecondaryUser={eventSecondaryUser}
      />
    );

  if (contentId === '2') return <EventUrlForm event={event} />;
  if (contentId === '3') return <EventCoverImageForm event={event} />;
  if (contentId === '4') return <EventCoverMessageForm event={event} />;
  if (contentId === '5') return <EventDateForm event={event} />;
  if (contentId === '7') return <BankDetailsForm />;
  return null;
};

export default GeneralConfigModalRight;
