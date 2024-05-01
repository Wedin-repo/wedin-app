import Loader from '@/components/Loader';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import DashboardHeader from './components/dashboard-header';
import WishlistGifts from './components/wishlist-gifts';

export type DashboardSearchParams = {
  page?: string;
  name?: string;
};

type DashboardPageProps = {
  searchParams: DashboardSearchParams;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="flex flex-col justify-start mt-12 h-full">
      <DashboardHeader />

      <SearchBar scrollValue={200} scrollValueMobile={250} />

      <Suspense fallback={<Loader />}>
        <WishlistGifts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
