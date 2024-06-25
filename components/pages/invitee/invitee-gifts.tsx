import GiftCard from '@/components/cards/gifts';
import CardContainer from '@/components/cards/shared/card-container';
import EmptyState from '@/components/empty-state';
import InviteeWishlistGiftModal from '@/components/modals/invitee-gifts-modal';
import type {
  Event,
  Gift,
  Transaction,
  User,
  WishlistGift,
} from '@prisma/client';
import { EventPageSearchParams } from '@/app/(default)/events/[slug]/page';

type InvateeGiftsProps = {
  event: Event & {
    wishlistGifts: (WishlistGift & {
      gift: Gift;
      transactions: Transaction[];
    })[];
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
  searchParams: EventPageSearchParams;
};

async function InviteeGifts({ event, searchParams }: InvateeGiftsProps) {
  let { wishlistGifts } = event;

  if (!wishlistGifts || wishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  if (searchParams.category) {
    wishlistGifts = wishlistGifts.filter(
      w => w.gift.categoryId === searchParams.category
    );
  }

  if (wishlistGifts.length === 0) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  return (
    <CardContainer>
      {wishlistGifts.map(wishlistGift => (
        <InviteeWishlistGiftModal
          key={wishlistGift.id}
          wishlistGift={wishlistGift}
        >
          <GiftCard key={wishlistGift.id} gift={wishlistGift.gift} />
        </InviteeWishlistGiftModal>
      ))}
    </CardContainer>
  );
}

export default InviteeGifts;
