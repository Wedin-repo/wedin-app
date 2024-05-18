import { getEventsByUrl } from '@/actions/data/event';
import EmptyState from '@/components/empty-state';
import InvateeGiftsPage from '@/components/pages/invitee-gifts';

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

export default async function EventPage({
  params,
  searchParams,
}: EventPageProps) {
  const { slug } = params;

  const event = await getEventsByUrl(slug);

  if (!event) {
    return <EmptyState title="Event not found" />;
  }

  return <InvateeGiftsPage event={event} searchParams={searchParams} />;
}
