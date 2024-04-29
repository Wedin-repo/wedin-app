import { getCategories } from '@/actions/data/category';
import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import Loader from '@/components/Loader';
import GiftLists from '@/components/cards/gift-lists';
import { Suspense } from 'react';
import Categories from '../categories';

type PredefinedGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function PredefinedGifts({ searchParams }: PredefinedGiftsProps) {
  const categories = await getCategories();
  return (
    <div className="px-6 sm:px-10">
      <p className="mb-4 text-lg sm:mb-6 sm:text-xl text-secondaryTextColor">
        Comenzá con una lista pre-definida, podes personalizarla más adelante
      </p>

      <Categories categories={categories} />

      <div className="flex justify-center items-center">
        <Suspense fallback={<Loader />}>
          <GiftLists searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default PredefinedGifts;
