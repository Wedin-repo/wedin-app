import { getCategories } from '@/actions/data/category';
import { GetGiftsParams } from '@/actions/getGifts';
import Loader from '@/components/Loader';
import Gifts from '@/components/cards/gifts';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import Categories from '../categories';

type AllGiftsProps = {
  searchParams: GetGiftsParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  const categories = await getCategories();

  return (
    <div className="px-6 sm:px-10">
      <div className="mb-4 sm:mb-6">
        <SearchBar />
      </div>
      <p className="text-secondaryTextColor text-lg sm:text-xl mb-4 sm:mb-6">
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
