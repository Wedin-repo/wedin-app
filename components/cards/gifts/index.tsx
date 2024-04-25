import { GetGiftsParams, getGifts } from '@/actions/getGifts';
import EmptyState from '@/components/EmptyState';
import GiftCard from './card';
import CardContainer from '../shared/card-container';

type GiftsProps = {
  searchParams: GetGiftsParams;
  hideButton?: boolean;
};

async function Gifts({ searchParams, hideButton }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} hideButton={hideButton} />
      ))}
    </CardContainer>
  );
}

export default Gifts;
