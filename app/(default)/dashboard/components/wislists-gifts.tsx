import { getEvent } from '@/actions/data/event';
import { getWishlistGifts } from '@/actions/data/wishlist-gifts';
import DashboardGiftCard from '@/components/cards/wishlist-gifts';
import EmptyState from '@/components/empty-state';
import Pagination from '@/components/pagination';
import type { DashboardPageSearchParams } from '../page';

type WislistGiftsProps = {
  searchParams: DashboardPageSearchParams;
};

async function WislistGifts({ searchParams }: WislistGiftsProps) {
  const event = await getEvent();

  if (!event) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }

  const wishlistId = event.wishlistId;
  const itemsPerPage = 15;
  const { page = '1', name } = searchParams;

  // Get total wishlist gifts to determine if the wishlist is empty
  const totalWishlistGifts = await getWishlistGifts({ wishlistId });

  if (!totalWishlistGifts || totalWishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  // Fetch filtered wishlist gifts based on search params
  const filteredWishlistGifts = await getWishlistGifts({
    wishlistId,
    name,
  });

  if (filteredWishlistGifts.length === 0 && name) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredWishlistGifts.length / itemsPerPage);
  const paginatedWishlistGifts = await getWishlistGifts({
    wishlistId,
    name,
    page,
    itemsPerPage,
  });

  return (
    <>
      {paginatedWishlistGifts.map(wishlistGift => (
        <DashboardGiftCard
          key={wishlistGift.id}
          event={event}
          wishlistGift={wishlistGift}
        />
      ))}

      {totalPages > 1 ? (
        <div className="flex justify-center m-5 w-full">
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        /* This is so that the space left by not having the pagination is covered and it is consistent */
        <div className="h-[72px]" />
      )}
    </>
  );
}

export default WislistGifts;
