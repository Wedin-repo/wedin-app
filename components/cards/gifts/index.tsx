import { getGifts } from '@/actions/data/gift';
import { GiftListPageParams } from '@/app/(default)/giftLists/[giftListId]/page';
import EmptyState from '@/components/EmptyState';
import CardContainer from '../shared/card-container';
import GiftCard from './card';
import { GetGiftsSearchParams } from '@/app/(default)/gifts/page';

type GiftsProps = {
  searchParams: GetGiftsSearchParams | GiftListPageParams;
  hideModal?: boolean;
};

async function Gifts({ searchParams }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} />
      ))}
    </CardContainer>
  );
}

export default Gifts;
