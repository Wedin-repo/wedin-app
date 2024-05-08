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
import { getCategory } from '@/actions/data/category';
import Image from 'next/image';
import { getCategories } from '@/actions/data/category';

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

  const categories = await getCategories();
  if (!categories) return null;

  const formattedPrice = formatPrice(Number(price));
  const category = await getCategory({ searchParams: { categoryId } });

  return (
    <Card>
      <CardContent>{/* create gift form compoennt */}</CardContent>
    </Card>
  );
};

export default DashboardGiftCard;
