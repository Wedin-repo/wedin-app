import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ringsLoader from '@/public/images/rings.svg';
import type {
  Event,
  Gift,
  Transaction,
  TransactionStatusLog,
  User,
  WishlistGift,
} from '@prisma/client';
import Image from 'next/image';
import { FaLongArrowAltRight } from 'react-icons/fa';
import EditTransactionModal from '../modals/edit-transaction-modal';
import ShowTransactionLogModal from '../modals/transaction-log-modal';

export type TransactionsCardProps = {
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

const TransactionCard = async ({ transaction }: TransactionsCardProps) => {
  const { wishlistGift, payerRole, payeeRole } = transaction;
  const { gift } = wishlistGift;
  const { name, price, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));

  return (
    <Card variant="dashboard" size="dashboard">
      <CardHeader variant="dashboard" className="relative w-[118px] h-[118px]">
        <Image
          src={imageUrl || ringsLoader}
          height={118}
          width={118}
          alt={name}
          className="object-cover rounded-lg shadow"
        />
      </CardHeader>

      <CardContent variant="dashboard" className="gap-1">
        <p className="flex flex-row text-lg font-medium text-primaryTitleColor">
          {name}
          <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 ml-2 rounded-full text-secondaryTextColor">
            {transaction.status}
          </span>
        </p>

        <span className="text-lg text-black">{formattedPrice}</span>
        <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center">
          <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
            {payerRole}
          </span>
          <FaLongArrowAltRight />
          <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
            {payeeRole}
          </span>
        </div>
      </CardContent>

      <CardFooter variant="dashboard">
        <EditTransactionModal transaction={transaction} />
        <ShowTransactionLogModal transaction={transaction} />
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
