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

type DashboardGiftCardProps = {
  gift: Gift;
  wishListId?: string | null;
};

const DashboardGiftCard = ({ gift, wishListId }: DashboardGiftCardProps) => {
  const { id, name, description, price, isDefault, imageUrl } = gift;
  const formattedPrice = formatPrice(Number(price));

  return (
    <Card variant="dashboard" size="dashboard">
      <CardHeader variant="dashboard" className="relative w-[90px]">
        <Image
          src={imageUrl || ringsLoader}
          height={90}
          width={90}
          alt={name}
          className="object-cover rounded-lg"
        />
        {isDefault && (
          <div className="absolute top-2 right-2 p-1 text-xs text-yellow-400 bg-white rounded-full shadow-inner transform translate-x-1/2 -translate-y-1/2">
            ⭐️
          </div>
        )}
      </CardHeader>

      <CardContent variant="dashboard">
        <p className="text-lg font-medium text-primaryTitleColor">{name}</p>
        <p className="hidden text-sm sm:block text-secondaryTextColor">
          {description}
        </p>
        <span className="text-lg text-black">{formattedPrice}</span>
      </CardContent>

      <CardFooter variant="dashboard">
        <EditGiftModal gift={gift} />
        <RemoveFromWishListForm giftId={id} wishlistId={wishListId} />
      </CardFooter>
    </Card>
  );
};

export default DashboardGiftCard;
