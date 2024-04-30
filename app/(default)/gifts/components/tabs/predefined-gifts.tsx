import { getCategories } from '@/actions/data/category';
import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import Loader from '@/components/Loader';
import GiftLists from '@/components/cards/gift-lists';
import { Suspense } from 'react';

type PredefinedGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function PredefinedGifts({ searchParams }: PredefinedGiftsProps) {
  return (
    <Suspense fallback={<Loader />}>
      <GiftLists searchParams={searchParams} />
    </Suspense>
  );
}

export default PredefinedGifts;
