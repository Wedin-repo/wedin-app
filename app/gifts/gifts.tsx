import { GiftParams, getGifts } from '@/actions/gift/getGift';
import EmptyState from '@/components/EmptyState';
import GiftCard from '@/components/cards/gifts/card';

type GiftsProps = {
  searchParams: GiftParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts) return <EmptyState showReset />;

  return (
    <>
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} />
      ))}
    </>
  );
}

export default Gifts;
