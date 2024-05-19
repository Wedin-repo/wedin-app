import { getEvent } from '@/actions/data/event';
import { getTransactions } from '@/actions/data/transaction';
import EmptyState from '@/components/empty-state';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';

async function WalletOverview() {
  const event = await getEvent();
  if (!event) return null;

  const { transactions: wishlistTransactions } = await getTransactions({
    wishlistId: event.wishlistId,
  });

  if (!wishlistTransactions || wishlistTransactions.length === 0) {
    return <EmptyState showReset title="No hay Regalos recibidos" />;
  }

  const completedWishlistGift = wishlistTransactions.filter(transaction => {
    return transaction.status === 'COMPLETED';
  });

  const completedTotalAmount = completedWishlistGift.reduce(
    (sum, transaction) => {
      return sum + Number.parseInt(transaction.amount);
    },
    0
  );

  const formattedTotalAmount = formatPrice(completedTotalAmount);

  return (
    <div className="flex flex-col gap-2 p-6 bg-red-100">
      <h1 className="text-2xl">Resumen de tu billetera</h1>

      <p className="pt-2 text-secondaryBorderColor">Regalos recibidos</p>
      <p className="flex flex-row gap-5 justify-start items-start text-primaryTextColor">
        {formattedTotalAmount}{' '}
        <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
          {completedWishlistGift.length} Regalos
        </span>
      </p>

      <p className="pt-2 text-secondaryBorderColor">Disponibles para retiro</p>
      <p className="flex flex-row gap-5 justify-start items-start text-primaryTextColor">
        {formattedTotalAmount}{' '}
        <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
          {completedWishlistGift.length} Regalos
        </span>
      </p>

      <Button variant="primaryButton" className="mt-12" type="submit">
        Enviar a mi cuenta
      </Button>
    </div>
  );
}

export default WalletOverview;
