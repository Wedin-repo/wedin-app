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
import { FaChevronRight } from 'react-icons/fa6';
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
    <Card>
      <CardHeader className="p-0">
        <div className="w-full flex items-center">
          <Image
            src={imageUrl || ringsLoader}
            width={500}
            height={0}
            alt={gift.name}
            className="rounded-t-lg h-[252px] w-full object-cover"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-primaryTitleColor font-medium text-sm">{name}</p>
        <p className="text-secondaryTextColor text-sm">{description}</p>
        <div className="flex flex-grow items-end justify-between text-primaryTitleColor">
          <p className="font-medium text-lg">{formattedPrice}</p>
          <FaChevronRight fontSize="22" className="pb-1 block sm:hidden" />
        </div>
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
