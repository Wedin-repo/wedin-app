import { getEvent } from '@/actions/data/event';
import { getTransactions } from '@/actions/data/transaction';
import WishlistGiftTransactionCard from '@/components/cards/wishlist-gift-transactions';
import EmptyState from '@/components/empty-state';
import Loader from '@/components/loader';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';
import type { GiftsReceivedPageSearchParams } from '../page';

type WislistgiftTransactionsProps = {
  searchParams: GiftsReceivedPageSearchParams;
};

async function WishlistGiftTransactions({
  searchParams,
}: WislistgiftTransactionsProps) {
  const event = await getEvent();
  if (!event) return null;

  const { transactions: wishlistTransactions } = await getTransactions({
    wishlistId: event.wishlistId,
  });

  if (!wishlistTransactions || wishlistTransactions.length === 0) {
    return <EmptyState showReset title="No hay Regalos recibidos" />;
  }

  const itemsPerPage = 8;
  const { transactionPage = '1' } = searchParams;

  const totalPages = Math.ceil(wishlistTransactions.length / itemsPerPage);
  const { transactions: paginatedTransactions } = await getTransactions({
    wishlistId: event.wishlistId,
    page: transactionPage,
    itemsPerPage,
  });

  return (
    <div className="flex flex-col p-6 bg-red-100">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl">Movimientos</h1>
        <h1 className="text-xl">Descargar extracto</h1>
      </div>

      <Suspense fallback={<Loader />}>
        {paginatedTransactions?.map(transaction => (
          <WishlistGiftTransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
        {totalPages > 1 ? (
          <div className="flex justify-center m-5 w-full">
            <Pagination totalPages={totalPages} pageVarName="transactionPage" />
          </div>
        ) : (
          /* This is so that the space left by not having the pagination is covered and it is consistent */
          <div className="h-[72px]" />
        )}
      </Suspense>
    </div>
  );
}

export default WishlistGiftTransactions;
