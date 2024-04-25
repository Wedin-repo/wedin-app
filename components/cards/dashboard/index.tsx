import { GetGiftsParams, getGifts } from '@/actions/getGifts';
import EmptyState from '@/components/EmptyState';
import CardContainer from '../shared/card-container';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GetGiftsParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftCard
          key={gift.id}
          gift={gift}
          wishListId={searchParams.wishListId}
        />
      ))}
    </CardContainer>
  );
}

export default Gifts;
