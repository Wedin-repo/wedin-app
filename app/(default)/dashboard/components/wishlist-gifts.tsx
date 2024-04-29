import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { GetGiftsParams } from '@/actions/getGiftsPagination';
import Loader from '@/components/Loader';
import Gifts from '@/components/cards/dashboard';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';

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
    </>
  );
}

export default WishlistGifts;
