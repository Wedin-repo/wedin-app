import { getGifts } from '@/actions/data/gift';
import { getWedding } from '@/actions/data/wedding';
import type { DashboardPageSearchParams } from '@/app/(default)/dashboard/page';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import DashboardGiftCard from './card';

type DashboardGiftsProps = {
  searchParams: DashboardPageSearchParams;
};

export default async function DashboardGifts({
  searchParams,
}: DashboardGiftsProps) {
  const wedding = await getWedding();
  const wishListId = wedding?.wishListId;

  if (!wishListId) {
    return (
      <EmptyState showReset title="No se ha creado una lista de regalos" />
    );
  }

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

  // This also takes into account when the name
  // is empty so it regurns all the gifts when that happens
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
      {paginatedFilteredWishlistGift.map(gift => (
        <DashboardGiftCard key={gift.id} gift={gift} wishListId={wishListId} />
      ))}

      {totalPages > 1 ? (
        <div className="flex justify-center m-5 w-full">
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        /* This is so that the space leave by not
        having the pagination is covered  it is consistent */
        <div className="h-[72px]" />
      )}
    </div>
  );
}
