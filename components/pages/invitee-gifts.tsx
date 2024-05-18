import { getWishlistGifts } from '@/actions/data/wishlist-gifts';
import type { EventPageSearchParams } from '@/app/(default)/events/[slug]/page';
import EmptyState from '@/components/empty-state';
import type { Event, User, WishListGift } from '@prisma/client';
import GiftCard from '../cards/gifts';
import CardContainer from '../cards/shared/card-container';
import WishlistGiftModal from '../modals/invitee-gifts-modal';

type InvateeGiftsProps = {
  event: Event & {
    wishlistGifts: WishListGift[];
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
  searchParams: EventPageSearchParams;
};

async function InviteeGifts({ event, searchParams }: InvateeGiftsProps) {
  const wishlistId = event.wishlistId;
  const { category } = searchParams;

  // Get total wishlist gifts to determine if the wishlist is empty
  const wishlistGifts = await getWishlistGifts({ wishlistId, category });

  if (!wishlistGifts || wishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  return (
    <CardContainer>
      {wishlistGifts.map(wishlistGift => (
        <WishlistGiftModal key={wishlistGift.id} wishlistGift={wishlistGift}>
          <GiftCard key={wishlistGift.id} gift={wishlistGift.gift} />
        </WishlistGiftModal>
      ))}
    </CardContainer>
  );
}

export default InviteeGifts;
