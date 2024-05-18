import { getCategories, getCategory } from '@/actions/data/category';
import DeleteWishlistGiftForm from '@/components/forms/dashboard/delete-wishlist-gift-form';
import EditGiftModal from '@/components/modals/edit-gift-modal';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import ringsLoader from '@/public/images/rings.svg';
import type { Gift, WishListGift } from '@prisma/client';
import Image from 'next/image';

type DashboardGiftCardProps = {
  eventId: string;
  wishlistGift: WishListGift & { gift: Gift };
};

const DashboardGiftCard = async ({
  eventId,
  wishlistGift,
}: DashboardGiftCardProps) => {
  const categories = await getCategories();
  if (!categories) return null;

  const { id, name, price, imageUrl, categoryId } = wishlistGift.gift;
  const { isFavoriteGift, isGroupGift, wishListId: wishlistId } = wishlistGift;

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

      <CardFooter variant="dashboard">
        <EditGiftModal
          categories={categories}
          eventId={eventId}
          wishlistGift={wishlistGift}
          wishlistId={wishlistId}
        />
        <DeleteWishlistGiftForm giftId={id} wishlistId={wishlistId} />
      </CardFooter>
    </Card>
  );
};

export default DashboardGiftCard;
