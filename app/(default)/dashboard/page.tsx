import prisma from '@/db/client';
import { getEvent } from '@/actions/data/event';
import { getWishListGifts } from '@/actions/data/wishlist-gifts';
import EmptyState from '@/components/EmptyState';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import DashboardGiftCard from '@/components/cards/dashboard/card';
import SearchBar from '@/components/search-bar';
import { Suspense } from 'react';
import DashboardHeader from './components/dashboard-header';

export type DashboardPageSearchParams = {
  page?: string;
  name?: string;
};
type DashboardPageProps = {
  searchParams: DashboardPageSearchParams;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const event = await getEvent();

  if (!event) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }

  const wishlistId = event.wishlistId;
  const itemsPerPage = 8;
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
    <div className="flex flex-col justify-start mt-12 h-full">
      <DashboardHeader wishlistId={wishlistId} />

      <SearchBar scrollValue={200} scrollValueMobile={250} />

      <Suspense fallback={<Loader />}>
        <div className="flex flex-col gap-5">
          {paginatedWishlistGifts.map(wishListGift => (
            <DashboardGiftCard
              key={wishListGift.id}
              eventId={event.id}
              wishlistId={wishlistId}
              wishListGift={wishListGift}
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
        </div>
      </Suspense>
    </div>
  );
}
