import { GetGiftListsParams } from '@/actions/getGiftLists';
import { getCategories } from '@/actions/getCategories';
import { Suspense } from 'react';
import Categories from '../components/categories';
import GiftLists from '@/components/cards/gift-lists';
import SearchBar from '@/components/search-bar';
import { Loader2 } from 'lucide-react';

type PredefinedGiftsProps = {
  searchParams: GetGiftListsParams;
};

async function PredefinedGifts({ searchParams }: PredefinedGiftsProps) {
  const categories = await getCategories();
  return (
    <div className='px-6 sm:px-10'>
      <div className='mb-4 sm:mb-6'>
        <SearchBar />
      </div>
      <p className="text-secondaryTextColor text-lg sm:text-xl mb-4 sm:mb-6">
        Comenzá con una lista pre-definida, podes personalizarla más adelante
      </p>

      <Categories categories={categories} />

      <div className="flex justify-center items-center">
        <Suspense fallback={<div className='min-h-[50vh] flex items-center justify-center'><Loader2 className="h-20 w-20 animate-spin text-secondaryBorderColor" /></div>}>
          <GiftLists searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

export default PredefinedGifts;
