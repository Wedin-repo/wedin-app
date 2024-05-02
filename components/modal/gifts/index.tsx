import { getGifts } from '@/actions/data/gift';
import { GiftListSearchParams } from '@/app/(default)/giftLists/[giftListId]/page';
import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import EmptyState from '@/components/EmptyState';
import GiftCard from '@/components/cards/gifts/card';
import CardContainer from '@/components/cards/shared/card-container';
import GiftModal from './modal';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';

type GiftsModalProps = {
  searchParams: GiftPageSearchParams | GiftListSearchParams;
};

async function GiftsModals({ searchParams }: GiftsModalProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftModal key={gift.id} gift={gift} wishlistId={wedding?.wishListId}>
          <GiftCard gift={gift} />
        </GiftModal>
      ))}
    </CardContainer>
  );
}

export default GiftsModals;
