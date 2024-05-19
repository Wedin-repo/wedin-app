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

  const { transactions: totalTransactions } = await getTransactions();

  if (!totalTransactions || totalTransactions.length === 0) {
    return <EmptyState showReset title="Aún no hay transactiones" />;
  }

  const { transactions: filteredTransactions } = await getTransactions({
    ...searchParams,
    page,
  });

  if (!filteredTransactions) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }

  if (filteredTransactions.length === 0 && name) {
    return <EmptyState title="No se encontraron regalos" />;
  }

  const totalPages = Math.ceil(totalTransactions.length / itemsPerPage);

  return (
    <>
      {filteredTransactions.map(transaction => (
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
