import RemoveFromWishListForm from '@/components/cards/dashboard/components/delete-from-wishlist-form';
import EditGiftModal from '@/components/cards/dashboard/components/edit-gift-modal';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ringsLoader from '@/public/images/rings.svg';
import { Gift } from '@prisma/client';
import { getCategory } from '@/actions/data/category';
import Image from 'next/image';

type DashboardGiftCardProps = {
  gift: Gift;
  wishListId?: string | null;
};

const DashboardGiftCard = async ({
  gift,
  wishListId,
}: DashboardGiftCardProps) => {
  const {
    id,
    name,
    price,
    isDefault,
    imageUrl,
    categoryId,
    isFavoriteGift,
    isGroupGift,
  } = gift;
  const formattedPrice = formatPrice(Number(price));

  const category = await getCategory({ searchParams: { categoryId } });

  return (
    <Card variant="dashboard" size="dashboard">
      <CardHeader variant="dashboard" className="relative w-[118px] h-[118px]">
        <Image
          src={imageUrl || ringsLoader}
          height={118}
          width={500}
          alt={name}
          className="object-cover rounded-lg shadow"
        />
        {isDefault && (
          <div className="absolute top-2 right-2 p-1 text-xs text-yellow-400 bg-white rounded-full shadow-inner transform translate-x-1/2 -translate-y-1/2">
            ⭐️
          </div>
        )}
      </CardHeader>

      <CardContent variant="dashboard">
        <p className="text-lg font-medium text-primaryTitleColor">{name}</p>
        <p className="text-sm text-secondaryTextColor">{category?.name}</p>
        <span className="text-lg text-black">{formattedPrice}</span>
        {(isFavoriteGift || isGroupGift) && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            {isFavoriteGift && (
              <span className="text-xs bg-[#F2F2F2] py-1.5 px-3 rounded-full text-secondaryTextColor">
                El que más queremos ⭐️
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

      <CardFooter variant="dashboard">
        <EditGiftModal gift={gift} />
        <RemoveFromWishListForm giftId={id} wishlistId={wishListId} />
      </CardFooter>
    </Card>
  );
};

export default DashboardGiftCard;
