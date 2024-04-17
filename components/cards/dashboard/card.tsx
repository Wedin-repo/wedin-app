import { Gift, User } from '@prisma/client';
import { formatPrice } from '@/utils/format';
import RemoveFromWishListForm from '@/components/cards/dashboard/components/delete-from-wishlist-form';
import EditGiftModal from '@/components/cards/dashboard/components/edit-gift-modal';

type GiftCard = {
  gift: Gift;
  wishListId?: string | null;
};

const GiftCard = async ({ gift, wishListId }: GiftCard) => {
  const { id, name, description, price, isDefault } = gift;

  const formattedPrice = formatPrice(Number(price));

  return (
    <div className="border-b-[#848484] border-b pb-3 w-full flex items-center justify-between gap-4">
      <div className="relative">
        <div className="h-[90px] bg-borderColor rounded-xl w-[90px] flex items-center justify-center text-white">
          item
        </div>

        {isDefault && (
          <div className="absolute top-2 right-2 shadow-inner bg-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 text-yellow-400 text-xs">
            ⭐️
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 w-full justify-start">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-sm text-secondaryTextColor">{description}</p>
        <span className="text-black text-lg">{formattedPrice}</span>
      </div>

      <div className="flex items-center gap-3">
        <EditGiftModal gift={gift} />
        <RemoveFromWishListForm giftId={id} wishlistId={wishListId} />
      </div>
    </div>
  );
};

export default GiftCard;