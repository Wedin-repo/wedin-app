import { GetGiftsParams } from '@/actions/data/gift';
import Loader from '@/components/Loader';
import Gifts from '@/components/cards/dashboard';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';

type WishlistGiftsProps = {
  searchParams: GetGiftsParams;
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
