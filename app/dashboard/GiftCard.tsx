'use client';

import { Gift, User, WishList } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import { formatPrice } from '@/utils/format';
import { toast } from '@/components/ui/use-toast';
import { FaCheck } from 'react-icons/fa6';

type GiftCard = {
  gift: Gift;
  currentUser: User;
  wishListId: string | null;
};

const GiftCard = async ({ gift, currentUser, wishListId }: GiftCard) => {
  const { name, description, price } = gift;

  const deleteGiftFromWishList = async () => { 
    try {
      const response = await fetch(`/api/wishList/${wishListId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: ['gifts'] },
        body: JSON.stringify({
          giftId: gift.id,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Gift deleted from your wishlist.',
          action: <FaCheck color="green" fontSize={'36px'} />,
          className: 'bg-white',
        });
      } else {
        throw new Error('Failed to add gift to wishlist');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to remove gift from wishlist.',
        action: <FaCheck color="red" fontSize={'36px'} />,
        className: 'bg-white',
      });
    }
  }


  const formattedPrice = formatPrice(Number(price));
  
  return (
    <div className="border-b-[#848484] border-b pb-3 w-full flex items-center justify-between gap-4">
      <div>
        <div className="h-[90px] bg-borderColor rounded-xl w-[90px] flex items-center justify-center text-white">
          item
        </div>
      </div>

      <div className="flex flex-col gap-1 w-full justify-start">
        <h1 className="text-primaryTitleColor font-medium text-lg">{name}</h1>
        <p className="text-sm text-secondaryTextColor">{description}</p>
        <span className="text-black text-lg">{formattedPrice}</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="border border-[#484848] hover:bg-primaryBackgroundColor transition-colors hover:text-white rounded-xl p-2.5">
          <FiEdit3 />
        </button>
        <button onClick={deleteGiftFromWishList} className="border border-[#484848] hover:border-red-500 hover:bg-red-500 transition-colors hover:text-white rounded-xl p-2.5">
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default GiftCard;
