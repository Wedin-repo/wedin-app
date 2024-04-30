import { getGifts } from '@/actions/data/gift';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { DashboardSearchParams } from '@/app/(default)/dashboard/page';
import EmptyState from '@/components/EmptyState';
import Loader from '@/components/Loader';
import Pagination from '@/components/cards/dashboard/components/pagination';
import { Suspense } from 'react';
import GiftCard from './card';

type GiftsProps = {
  searchParams: DashboardSearchParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;

  // This is to count is just for the case that when
  // the user had not add any gift to the wishlist
  // and not because the filters are not returning any gift
  const wishlistGifts = await getGifts({
    searchParams: { wishListId: wishListId },
  });

  if (!wishlistGifts || wishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  const itemsPerPage = 8;
  const { page = '1', name } = searchParams;

  // This also takes into account when the
  // name is empty so it regurns all the gifts
  // when that happens
  const filteredWishlistGifts = await getGifts({
    searchParams: { ...searchParams, wishListId },
  });

  if (filteredWishlistGifts.length === 0 && name) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  const totalPages = Math.ceil(filteredWishlistGifts.length / itemsPerPage);
  const paginatedFilteredWishlistGift = await getGifts({
    searchParams: { ...searchParams, itemsPerPage, page, wishListId },
  });

  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<Loader />}>
        {paginatedFilteredWishlistGift.map(gift => (
          <GiftCard key={gift.id} gift={gift} wishListId={wishListId} />
        ))}
      </Suspense>

      {totalPages > 1 ? (
        <div className="flex justify-center m-5 w-full">
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        /* This is so that the space leave by
         * not having the pagination is covered
         * it is consistent */
        <div className="h-[72px]" />
      )}
    </div>
  );
}

export default Gifts;
