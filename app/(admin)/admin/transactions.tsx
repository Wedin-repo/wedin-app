import { getTransactions } from '@/actions/data/transaction';
import TransactionCard from '@/components/cards/transactions-cards';
import EmptyState from '@/components/empty-state';
import Pagination from '@/components/pagination';
import type { AdminPageSearchParams } from './page';

type TransactionProps = {
  searchParams: AdminPageSearchParams;
};

async function Transactions({ searchParams }: TransactionProps) {
  const itemsPerPage = 15;
  const { page = '1', name } = searchParams;

  // Get total wishlist gifts to determine if the wishlist is empty
  const { transactions } = await getTransactions(searchParams);

  if (!transactions) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }

  // If there are no transactions, show empty state
  if (transactions.length === 0 && name) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  // Calculate pagination
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (Number(page) - 1) * itemsPerPage,
    Number(page) * itemsPerPage
  );

  return (
    <>
      {paginatedTransactions.map(transaction => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}

      {totalPages > 1 ? (
        <div className="flex justify-center m-5 w-full">
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        /* This is so that the space left by not having the pagination is covered and it is consistent */
        <div className="h-[72px]" />
      )}
    </>
  );
}

export default Transactions;
