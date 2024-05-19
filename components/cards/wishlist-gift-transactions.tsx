import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import type {
  Event,
  Gift,
  Transaction,
  TransactionStatusLog,
  User,
  WishlistGift,
} from '@prisma/client';

type WishlistgiftTransactionsCardProps = {
  transaction: Transaction & {
    wishlistGift: WishlistGift & {
      gift: Gift;
      event: Event;
    };
    transactionStatusLogs: (TransactionStatusLog & {
      changedBy: User;
    })[];
  };
};

const WishlistGiftTransactionCard = async ({
  transaction,
}: WishlistgiftTransactionsCardProps) => {
  const { status, amount, wishlistGift } = transaction;
  const { gift } = wishlistGift;
  const { name } = gift;
  const formattedPrice = formatPrice(Number(amount));

  return (
    <Card variant="dashboard" size="dashboard">
      <CardHeader variant="default" className="">
        {name}
      </CardHeader>

      <CardContent variant="dashboard">
        <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center">
          <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
            {status}
          </span>
        </div>
      </CardContent>

      <CardFooter variant="dashboard">
        <span className="text-lg text-black">{formattedPrice}</span>
      </CardFooter>
    </Card>
  );
};

export default WishlistGiftTransactionCard;
