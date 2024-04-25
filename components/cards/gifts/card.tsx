import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import ringsLoader from '@/public/images/rings.svg';
import { formatPrice } from '@/utils/format';
import { Gift } from '@prisma/client';
import Image from 'next/image';
import GiftCardModal from './components/gift-modal';

type GiftCardProps = {
  gift: Gift;
  hideButton?: boolean;
};

async function GiftCard({ gift, hideButton = false }: GiftCardProps) {
  const { name, description, price, imageUrl } = gift;
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const formattedPrice = formatPrice(Number(price));

  return (
    <Card
      className="flex flex-col p-0 cursor-pointer
      transition duration-200 ease-in-out transform hover:scale-105
      hover:shadow-2xl"
    >
      <CardHeader className="p-0">
        <div className="w-full flex items-center">
          <Image
            src={imageUrl || ringsLoader}
            width={500}
            height={0}
            alt={gift.name}
            className="rounded-t-xl h-[252px] w-full object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-secondaryTextColor">{description}</p>
        <h1 className="flex flex-grow items-end justify-end text-primaryTitleColor font-medium text-lg">
          {formattedPrice}
        </h1>
      </CardContent>

      {!hideButton ||
        !wedding ||
        (!!wedding.wishListId && (
          <CardFooter className="p-0" style={{ display: 'none' }}>
            <GiftCardModal gift={gift} wishlistId={wedding.wishListId} />
          </CardFooter>
        ))}
    </Card>
  );
}

export default GiftCard;
