import { Suspense } from 'react';
import { GetGiftsParams } from '@/actions/getGiftsPagination';
import { getWedding } from '@/actions/getWedding';
import { User } from '@prisma/client';
import SearchBar from '../../components/search-bar';
import Gifts from '@/components/cards/dashboard';
// import Pagination from '@/components/cards/dashboard/components/pagination';
import Loader from '@/components/Loader';

type AllGiftsProps = {
  searchParams: GetGiftsParams;
  currentUser: User;
};

async function AllGifts({ searchParams, currentUser }: AllGiftsProps) {
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

export default AllGifts;
