import { getCategories } from '@/actions/getCategories';
import { Suspense } from 'react';
import Categories from '../components/categories';
import Gifts from '../components/gifts';
import { GetGiftsParams } from '@/actions/getGifts';

type AllGiftsProps = {
  searchParams: GetGiftsParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  const categories = await getCategories();

  return (
    <>
      <p className="text-secondaryTextColor text-lg sm:text-xl mb-6 sm:mb-8 px-10">
        Elegí los productos que más te gusten y empezá a armar tu lista
      </p>

      <Categories categories={categories} />

      <div className="flex justify-center items-center">
        <div className="px-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Gifts searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default AllGifts;
