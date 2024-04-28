import { getGifts } from '@/actions/data/gift';
import { getGiftList } from '@/actions/data/giftlist';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import Loader from '@/components/Loader';
import Gifts from '@/components/cards/gifts';
import { formatPrice } from '@/utils/format';
import { Suspense } from 'react';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';
import AddToWishlistForm from './add-to-wishlist-form';

type GiftListPageProps = {
  params: {
    listId: string;
  };
};

export default async function GiftListPage({ params }: GiftListPageProps) {
  const { listId } = params;
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const giftList = await getGiftList(listId);
  const gifts = await getGifts({ searchParams: { giftListId: listId } });
  const giftIds = gifts?.map(gift => gift.id);

  if (!giftList) return null;

  const { name, quantity, totalPrice, description } = giftList;
  const formattedPrice = formatPrice(Number(totalPrice));

  return (
    <div className="flex flex-col min-h-[90vh] justify-start mt-12 sm:mt-12 px-6 sm:px-10">
      <div className="flex flex-col w-full items-center gap-4">
        <div className="flex flex-col items-center gap-3 w-full ">
          <h1 className="text-4xl font-medium text-primaryTextColor text-center">
            {name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="bg-secondaryBackgroundColor rounded-full py-1.5 px-4 flex items-center gap-2">
              <IoGiftOutline fontSize={'18px'} />
              {quantity} regalos
            </div>
            <div className="bg-secondaryBackgroundColor rounded-full py-1.5 px-4 flex items-center gap-2">
              <PiWallet fontSize={'18px'} />
              {formattedPrice}
            </div>
          </div>
          <p className="text-xl text-center">{description}</p>
        </div>

        <div className="w-full flex justify-center">
          <AddToWishlistForm
            wishlistId={wedding?.wishListId}
            giftIds={giftIds}
          />
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        <Suspense fallback={<Loader />}>
          <Gifts searchParams={{ giftListId: listId }} />
        </Suspense>
      </div>
    </div>
  );
}
