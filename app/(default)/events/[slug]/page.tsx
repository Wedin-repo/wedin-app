import { getEvent, getEventsByUrl } from '@/actions/data/event';

export default function Event({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const event = getEventsByUrl(slug);

  return <div>event with slug {slug}</div>;
}
