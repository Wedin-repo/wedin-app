import { getEventByUrl } from '@/actions/data/event';
import EmptyState from '@/components/empty-state';
import InvateePage from '@/components/pages/invitee-page';

export type EventPageParams = {
  slug: string;
};

export type EventPageSearchParams = {
  category: string;
  page: string;
};

type EventPageProps = {
  searchParams: EventPageSearchParams;
  params: EventPageParams;
};

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;
  const event = await getEventByUrl(slug);

  if (!event) {
    return <EmptyState title="Event not found" />;
  }

  return <InvateePage event={event} />;
}
