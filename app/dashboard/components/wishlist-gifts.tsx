import { Suspense } from 'react';
import { GetGiftsParams } from '@/actions/getGiftsPagination';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import Loader from '@/components/Loader';
import Gifts from '@/components/cards/dashboard';
// import Pagination from '@/components/cards/dashboard/components/pagination';
import Pagination from '@/components/cards/dashboard/components/pagination';
import SearchBar from '../../components/search-bar';

type WishlistGiftsProps = {
  searchParams: GetGiftsParams;
};

async function WishlistGifts({ searchParams }: WishlistGiftsProps) {
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;

  return (
    <>
      <div className="my-8">
        <SearchBar />
      </div>

      <Suspense fallback={<Loader />}>
        <Gifts searchParams={{ ...searchParams, wishListId: wishListId }} />
      </Suspense>

      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={3} />
      </div> */}
    </>
  );
}

export default WishlistGifts;
