import RemoveFromWishListForm from '@/components/cards/dashboard/components/delete-from-wishlist-form';
import EditGiftModal from '@/components/cards/dashboard/components/edit-gift-modal';
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

type GiftCardProps = {
  gift: Gift;
  wishListId?: string | null;
};

const GiftCard = async ({ gift, wishListId }: GiftCardProps) => {
  const { id, name, description, price, isDefault, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));

  return (
    <Card variant="dashboard" size="dashboard">
      <CardHeader variant="dashboard" className="relative">
        <Image
          src={imageUrl || ringsLoader}
          height={90}
          width={90}
          alt={name}
          className="rounded-lg object-cover"
        />
        {isDefault && (
          <div className="absolute top-2 right-2 shadow-inner bg-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 text-yellow-400 text-xs">
            ⭐️
          </div>
        )}
      </CardHeader>

      <CardContent variant="dashboard">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-sm text-secondaryTextColor">{description}</p>
        <span className="text-black text-lg">{formattedPrice}</span>
      </CardContent>

      <CardFooter variant="dashboard">
        <EditGiftModal gift={gift} />
        <RemoveFromWishListForm giftId={id} wishlistId={wishListId} />
      </CardFooter>
    </Card>
  );
};

export default GiftCard;
