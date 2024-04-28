import {
  GetGiftsParams,
  getGiftsPagination,
} from '@/actions/getGiftsPagination';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/cards/dashboard/components/pagination';
import GiftCard from './card';
import { Gift } from '@prisma/client';

type GiftsProps = {
  searchParams: GetGiftsParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  console.log(searchParams);
  const { gifts, totalGiftsCount } = (await getGiftsPagination({
    searchParams,
  })) as { gifts: Gift[]; totalGiftsCount: number };

  console.log('total gift count', totalGiftsCount);
  if (!gifts) return null;

  const totalGifts = gifts?.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalGifts / itemsPerPage);

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
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Gifts;
