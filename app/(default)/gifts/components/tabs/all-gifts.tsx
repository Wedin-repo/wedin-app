import Loader from '@/components/Loader';
import Gifts from '@/components/cards/gifts';
import { Suspense } from 'react';
import { GiftPageSearchParams } from '../../page';

type AllGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return (
    <Suspense fallback={<Loader />}>
      <Gifts searchParams={searchParams} />
    </Suspense>
  );
}

export default AllGifts;
