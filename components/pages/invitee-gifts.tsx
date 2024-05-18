import GiftCard from '@/components/cards/gifts';
import CardContainer from '@/components/cards/shared/card-container';
import EmptyState from '@/components/empty-state';
import TransactionForm from '@/components/forms/invitees/create-transaction-form';
import WishlistGiftModal from '@/components/modals/invitee-gifts-modal';
import type { Event, Gift, User, WishlistGift } from '@prisma/client';

type InvateeGiftsProps = {
  event: Event & {
    wishlistGifts: (WishlistGift & {
      gift: Gift;
    })[];
    eventPrimaryUser: User | null;
    eventSecondaryUser: User | null;
  };
};

async function InviteeGifts({ event }: InvateeGiftsProps) {
  const { wishlistGifts } = event;

  if (!wishlistGifts || wishlistGifts.length === 0) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  return (
    <CardContainer>
      {wishlistGifts.map(wishlistGift => (
        <WishlistGiftModal
          key={wishlistGift.id}
          dialogContent={<TransactionForm wishlistGift={wishlistGift} />}
        >
          <GiftCard key={wishlistGift.id} gift={wishlistGift.gift} />
        </WishlistGiftModal>
      ))}
    </CardContainer>
  );
}

export default InviteeGifts;
