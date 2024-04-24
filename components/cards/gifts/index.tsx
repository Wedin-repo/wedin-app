import { GetGiftsParams, getGifts } from '@/actions/getGifts';
import EmptyState from '@/components/EmptyState';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GetGiftsParams;
  hideButton?: boolean;
};

async function Gifts({ searchParams, hideButton }: GiftsProps) {
  const gifts = await getGifts({ searchParams });

  if (gifts?.length === 0 || !gifts) return <EmptyState title='No se encontraron regalos' />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8">
      {gifts.map(gift => (
        <GiftCard key={gift.id} gift={gift} hideButton={hideButton} />
      ))}
    </div>
  );
}

export default Gifts;
