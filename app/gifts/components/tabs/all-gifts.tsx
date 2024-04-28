import { getCategories } from '@/actions/getCategories';
import { Suspense } from 'react';
import Categories from '../components/categories';
import { GetGiftsParams } from '@/actions/getGifts';
import Gifts from '@/components/cards/gifts';
import SearchBar from '@/components/search-bar';
import Loader from '@/components/Loader';

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
