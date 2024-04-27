import { getCurrentUser } from '@/actions/getCurrentUser';
import { GetGiftsParams, getGifts } from '@/actions/getGifts';
import { getWedding } from '@/actions/getWedding';
import EmptyState from '@/components/EmptyState';
import CardContainer from '../shared/card-container';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GetGiftsParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);

  return (
    <CardContainer>
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} wishlistId={wedding?.wishListId} />
      ))}
    </CardContainer>
  );
}

export default Gifts;
