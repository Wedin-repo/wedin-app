import { getCategories } from '@/actions/getCategories';
import { Suspense } from 'react';
import { GetGiftsParams } from '@/actions/getGifts';
import Gifts from '@/components/cards/dashboard';
import Search from '../../components/search-bar';

type AllGiftsProps = {
  searchParams: GetGiftsParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  //const categories = await getCategories();

  return (
    <>
      <div className="my-8">
        <Search />
      </div>

      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Gifts searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}

export default AllGifts;
