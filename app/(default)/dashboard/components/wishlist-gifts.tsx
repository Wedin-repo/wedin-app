import Loader from '@/components/Loader';
import Gifts from '@/components/cards/dashboard';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import { DashboardSearchParams } from '../page';

type WishlistGiftsProps = {
  searchParams: DashboardSearchParams;
};

function WishlistGifts({ searchParams }: WishlistGiftsProps) {
  return (
    <>
      <div className="my-8">
        <SearchBar />
      </div>

      <Suspense fallback={<Loader />}>
        <Gifts searchParams={searchParams} />
      </Suspense>
    </>
  );
}

export default WishlistGifts;
