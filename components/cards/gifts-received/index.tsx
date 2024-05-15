import { getGifts } from '@/actions/data/gift';
import { getEvent } from '@/actions/data/event';
import { getCurrentUser } from '@/actions/getCurrentUser';
import type { GiftsReceivedPageSearchParams } from '@/app/(default)/gifts-received/page';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/Pagination';
import GiftsReceivedGiftCard from './card';
import CardContainer from '@/components/cards/shared/card-container';

type GiftsReceivedProps = {
  searchParams: GiftsReceivedPageSearchParams;
};

export default async function GiftsReceived({
  searchParams,
}: GiftsReceivedProps) {
  const currentUser = await getCurrentUser();
  const wedding = await getEvent();
  const wishlistId = wedding?.wishlistId;

  if (!wishlistId) {
    return (
      <EmptyState showReset title="No se ha creado una lista de regalos" />
    );
  }

  const wishlistGifts = await getGifts({
    searchParams: { wishlistId },
  });

  if (!wishlistGifts || wishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  const itemsPerPage = 8;
  const { page = '1', name } = searchParams;

  const filteredWishlistGifts = await getGifts({
    searchParams: { ...searchParams, wishlistId },
  });

  if (filteredWishlistGifts.length === 0 && name) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  const totalPages = Math.ceil(filteredWishlistGifts.length / itemsPerPage);
  const paginatedFilteredWishlistGift = await getGifts({
    searchParams: { ...searchParams, itemsPerPage, page, wishlistId },
  });

  return (
    <div className="flex flex-col gap-5 mt-10">
      <CardContainer>
        {paginatedFilteredWishlistGift.map(gift => (
          <GiftsReceivedGiftCard
            key={gift.id}
            gift={gift}
            wishlistId={wishlistId}
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
