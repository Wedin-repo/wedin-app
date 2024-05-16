import { getEvent } from '@/actions/data/event';
import { getWishListGifts } from '@/actions/data/wishlist-gifts';
import type { GiftsReceivedPageSearchParams } from '@/app/(default)/gifts-received/page';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import CardContainer from '@/components/cards/shared/card-container';
import GiftsReceivedGiftCard from './card';

type GiftsReceivedProps = {
  searchParams: GiftsReceivedPageSearchParams;
};

export default async function GiftsReceived({
  searchParams,
}: GiftsReceivedProps) {
  const event = await getEvent();

  if (!event) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }

  const wishlistId = event.wishlistId;
  const itemsPerPage = 15;
  const { page = '1', name } = searchParams;

  // Get total wishlist gifts to determine if the wishlist is empty
  const totalWishlistGifts = await getWishListGifts({ wishlistId });

  if (!totalWishlistGifts || totalWishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  // Fetch filtered wishlist gifts based on search params
  const filteredWishlistGifts = await getWishListGifts({
    wishlistId,
    name,
  });

  if (filteredWishlistGifts.length === 0 && name) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredWishlistGifts.length / itemsPerPage);
  const paginatedWishlistGifts = await getWishListGifts({
    wishlistId,
    name,
    page,
    itemsPerPage,
  });

  return (
    <div className="flex flex-col gap-5 mt-10">
      <CardContainer>
        {paginatedWishlistGifts.map(wishlistGift => (
          <GiftsReceivedGiftCard
            key={wishlistGift.id}
            wishlistGift={wishlistGift}
          />
        ))}
      </CardContainer>

      {totalPages > 1 ? (
        <div className="flex justify-center m-5 w-full">
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        <div className="h-[72px]" />
      )}
    </div>
  );
}
