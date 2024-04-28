import {
  GetGiftsParams,
  getGiftsPagination,
} from '@/actions/getGiftsPagination';
import EmptyState from '@/components/EmptyState';
import Pagination from '@/components/cards/dashboard/components/pagination';
import { Gift } from '@prisma/client';
import GiftCard from './card';

type GiftsProps = {
  searchParams: GetGiftsParams;
};

async function Gifts({ searchParams }: GiftsProps) {
  const response = await getGiftsPagination({ searchParams });

  if (
    !response ||
    ((response as { totalGiftsCount: number }).totalGiftsCount === 0 &&
      !searchParams.name)
  ) {
    return <EmptyState showReset title="Aún no tienes regalos en tu lista" />;
  }

  const { gifts, totalGiftsCount } = response as {
    gifts: Gift[];
    totalGiftsCount: number;
  };

  const itemsPerPage = 15;
  const totalPages = Math.ceil(totalGiftsCount / itemsPerPage);

  if (gifts.length === 0 && searchParams.name) {
    return <EmptyState /* tryAgain */ title="No se encontraron regalos" />;
  }

  return (
    <div className="flex flex-col gap-5">
      {gifts.map(gift => (
        <GiftCard
          key={gift.id}
          gift={gift}
          wishListId={searchParams.wishListId}
        />
      ))}
      <div className="m-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default Gifts;
