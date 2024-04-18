import { getCategories } from '@/actions/getCategories';
import { Suspense } from 'react';
import { GetGiftsParams } from '@/actions/getGifts';
import Gifts from '@/components/cards/dashboard';
import Search from './components/search-bar';

async function AllGifts(searchParams: GetGiftsParams) {
  //const categories = await getCategories();
  const { wishListId } = searchParams;
  
  return (
    <>
      <div className="my-8">
        <Search />
      </div>

      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Gifts searchParams={wishListId} />
        </Suspense>
      </div>
    </>
  );
}

export default AllGifts;
