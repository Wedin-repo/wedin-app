import { getEvent } from '@/actions/data/event';
import { getGifts } from '@/actions/data/gift';
import { getCurrentUser } from '@/actions/get-current-user';
import GiftCard from '@/components/cards/gifts';
import CardContainer from '@/components/cards/shared/card-container';
import EmptyState from '@/components/empty-state';
import GiftModal from '@/components/modals/gift-modal';
import type { GiftPageSearchParams } from '../page';

type DefaultGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function DefaultGifts({ searchParams }: DefaultGiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  const event = await getEvent();
  const currentUser = await getCurrentUser();

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftModal
          key={gift.id}
          gift={gift}
          event={event}
          currentUser={currentUser}
        >
          <GiftCard gift={gift} />
        </GiftModal>
      ))}
    </CardContainer>
  );
}
export default DefaultGifts;
