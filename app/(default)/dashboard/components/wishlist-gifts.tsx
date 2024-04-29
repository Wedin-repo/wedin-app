import Loader from '@/components/Loader';
import Gifts from '@/components/cards/dashboard';
import { Suspense } from 'react';
import { DashboardSearchParams } from '../page';

type WishlistGiftsProps = {
  searchParams: DashboardSearchParams;
};

function WishlistGifts({ searchParams }: WishlistGiftsProps) {
  return (
    <Suspense fallback={<Loader />}>
      <Gifts searchParams={searchParams} />
    </Suspense>
  );
}

export default WishlistGifts;
