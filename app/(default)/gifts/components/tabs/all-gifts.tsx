import { getCategories } from '@/actions/data/category';
import Loader from '@/components/Loader';
import Gifts from '@/components/cards/gifts';
import { Suspense } from 'react';
import { GiftPageSearchParams } from '../../page';
import Categories from '../categories';

type AllGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  const categories = await getCategories();

  return (
    <div className="px-6 sm:px-10">
      <p className="mb-4 text-lg sm:mb-6 sm:text-xl text-secondaryTextColor">
        Elegí los productos que más te gusten y empezá a armar tu lista
      </p>

      <Categories categories={categories} />

      <Suspense fallback={<Loader />}>
        <Gifts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default AllGifts;
