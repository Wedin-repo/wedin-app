import { GetGiftsParams, getGifts } from '@/actions/getGifts';
import EmptyState from '@/components/EmptyState';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GetGiftsParams;
  hideButton?: boolean;
};

async function Gifts({ searchParams, hideButton }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts) return <EmptyState showReset />;

  return (
    <>
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} hideButton={hideButton} />
      ))}
    </>
  );
}

export default Gifts;
