import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Gift } from '@prisma/client';
import GiftCardModal from './components/gift-modal';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';
import ringsLoader from '@/public/images/rings.svg';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import { redirect } from 'next/navigation';

type GiftCardProps = {
  gift: Gift;
  hideButton?: boolean;
};

async function GiftCard({ gift, hideButton = false }: GiftCardProps) {
  const { name, description, price, imageUrl } = gift;
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const formattedPrice = formatPrice(Number(price));

  if (!wedding || !wedding.wishListId) return redirect('/gifts');

  return (
    <Card className="flex flex-col border-2 rounded-xl py-6 px-4 gap-4 max-w-[435px]">
      <CardHeader className="p-0">
        <div className="w-full flex items-center">
          <Image
            src={imageUrl || ringsLoader}
            width={500}
            height={0}
            alt={gift.name}
            className="border rounded-2xl h-[252px] w-full object-cover shadow"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow gap-1 w-full p-0">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-secondaryTextColor">{description}</p>
        <span className="text-secondaryTitleColor text-xl flex flex-grow items-end">
          {formattedPrice}
        </span>
      </CardContent>
      {!hideButton && (
        <CardFooter className="p-0">
          <GiftCardModal gift={gift} wishlistId={wedding.wishListId} />
        </CardFooter>
      )}
    </Card>
  );
}

export default GiftCard;
