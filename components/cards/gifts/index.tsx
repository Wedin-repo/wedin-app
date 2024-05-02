import { getGifts } from '@/actions/data/gift';
import { GiftListSearchParams } from '@/app/(default)/giftLists/[giftListId]/page';
import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import EmptyState from '@/components/EmptyState';
import CardContainer from '../shared/card-container';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GiftPageSearchParams | GiftListSearchParams;
  hideModal?: boolean;
};

async function Gifts({ searchParams, hideModal = false }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} hideModal={hideModal} />
      ))}
    </CardContainer>
  );
}

export default Gifts;
