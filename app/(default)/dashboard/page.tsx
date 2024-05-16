import { getEvent } from '@/actions/data/event';
import EmptyState from '@/components/EmptyState';
import Loader from '@/components/Loader';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import DashboardHeader from './components/dashboard-header';
import WislistGifts from './components/wislists-gifts';

export type DashboardPageSearchParams = {
  page?: string;
  name?: string;
};
type DashboardPageProps = {
  searchParams: DashboardPageSearchParams;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const event = await getEvent();

  if (!event) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }

  const wishlistId = event.wishlistId;

  return (
    <div className="flex flex-col justify-start mt-12 h-full">
      <DashboardHeader wishlistId={wishlistId} />

      <SearchBar scrollValue={200} scrollValueMobile={250} />

      <Suspense fallback={<Loader />}>
        <WislistGifts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
