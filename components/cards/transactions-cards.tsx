import { getCategories, getCategory } from '@/actions/data/category';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ringsLoader from '@/public/images/rings.svg';
import type { Event, Gift, Transaction, WishlistGift } from '@prisma/client';
import Image from 'next/image';
import EditTransactionModal from '../modals/edit-transaction-modal';

type TransactionsCardProps = {
  transaction: Transaction & {
    wishlistGift: WishlistGift & {
      gift: Gift;
      event: Event;
    };
  };
};

const TransactionCard = async ({ transaction }: TransactionsCardProps) => {
  const categories = await getCategories();
  if (!categories) return null;

  const { wishlistGift, payerRole, payeeRole } = transaction;
  const { gift } = wishlistGift;
  const { name, price, imageUrl, categoryId } = gift;
  const formattedPrice = formatPrice(Number(price));
  const category = await getCategory({ searchParams: { categoryId } });

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

      <CardContent variant="dashboard">
        <p className="text-lg font-medium text-primaryTitleColor">{name}</p>
        <p className="text-sm text-secondaryTextColor">{category?.name}</p>
        <span className="text-lg text-black">{formattedPrice}</span>
        <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center">
          <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
            {payerRole}
          </span>
          <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
            {payeeRole}
          </span>
        </div>
      </CardContent>

      <CardFooter variant="dashboard">
        <EditTransactionModal transaction={transaction} />
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
