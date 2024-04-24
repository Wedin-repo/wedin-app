import { getCategories } from '@/actions/getCategories';
import { Suspense } from 'react';
import Categories from '../components/categories';
import { GetGiftsParams } from '@/actions/getGifts';
import Gifts from '@/components/cards/gifts';
import SearchBar from '@/components/search-bar';
import { Loader2 } from 'lucide-react';

type AllGiftsProps = {
  searchParams: GetGiftsParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  const categories = await getCategories();
  return (
    <div className='px-6 sm:px-10'>
      <div className='mb-4 sm:mb-6'>
        <SearchBar />
      </div>
      <p className="text-secondaryTextColor text-lg sm:text-xl mb-4 sm:mb-6">
        Elegí los productos que más te gusten y empezá a armar tu lista
      </p>

      <Categories categories={categories} />

      <div className="flex justify-center items-center">
        <Suspense fallback={<div className='min-h-[50vh] flex items-center justify-center'><Loader2 className="h-20 w-20 animate-spin text-secondaryBorderColor" /></div>}>
          <Gifts searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default AllGifts;
