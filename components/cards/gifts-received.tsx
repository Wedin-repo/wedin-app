import { getCategories, getCategory } from '@/actions/data/category';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ringsLoader from '@/public/images/rings.svg';
import type { Gift, WishlistGift } from '@prisma/client';
import Image from 'next/image';

type GiftsReceivedGiftCardProps = {
  wishlistGift: WishlistGift & { gift: Gift };
};

const GiftsReceivedGiftCard = async ({
  wishlistGift,
}: GiftsReceivedGiftCardProps) => {
  const { name, price, imageUrl, categoryId } = wishlistGift.gift;
  const { isFavoriteGift, isGroupGift } = wishlistGift;

  const categories = await getCategories();
  if (!categories) return null;

  const formattedPrice = formatPrice(Number(price));
  const category = await getCategory({ searchParams: { categoryId } });

  return (
    <Card variant="giftsReceived" size="giftsReceived">
      <CardHeader>
        <Image
          src={imageUrl || ringsLoader}
          alt={name}
          width={500}
          height={500}
          className="object-cover w-full rounded-t-lg h-[252px]"
        />
      </CardHeader>

      <CardContent className="px-4">
        <p className="text-lg font-medium text-primaryTitleColor">{name}</p>
        <p className="text-sm text-secondaryTextColor">{category?.name}</p>
        <span className="text-lg text-black">{formattedPrice}</span>
        {(isFavoriteGift || isGroupGift) && (
          <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center">
            {isFavoriteGift && (
              <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
                El que más queremos ⭐
              </span>
            )}
            {isGroupGift && (
              <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
                Regalo grupal 🎁
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-4 items-center px-4 pb-4">
        <Button variant="outline" className="rounded-2xl">
          Ver mensaje
        </Button>
        <Button variant="primaryButton">Agradecer</Button>
      </CardFooter>
    </Card>
  );
};

export default GiftsReceivedGiftCard;
