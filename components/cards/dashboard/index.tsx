import { GetGiftsParams, getGifts } from '@/actions/getGifts';
import EmptyState from '@/components/EmptyState';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GetGiftsParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts)
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;

  return (
    <div className="flex flex-col gap-5">
      {gifts.map(gift => (
        <GiftCard
          key={gift.id}
          gift={gift}
          wishListId={searchParams.wishListId}
        />
      ))}
    </div>
  );
}

export default Gifts;
