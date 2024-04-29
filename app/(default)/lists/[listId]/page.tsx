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

export type GiftListSearchParams = {
  listId: string;
};

type GiftListPageProps = {
  params: GiftListSearchParams;
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
    <div className="flex flex-col justify-start px-6 mt-12 sm:px-10 sm:mt-12 min-h-[90vh]">
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="flex flex-col gap-3 items-center w-full">
          <h1 className="text-4xl font-medium text-center text-primaryTextColor">
            {name}
          </h1>
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center py-1.5 px-4 rounded-full bg-secondaryBackgroundColor">
              <IoGiftOutline fontSize={'18px'} />
              {quantity} regalos
            </div>
            <div className="flex gap-2 items-center py-1.5 px-4 rounded-full bg-secondaryBackgroundColor">
              <PiWallet fontSize={'18px'} />
              {formattedPrice}
            </div>
          </div>
          <p className="text-xl text-center">{description}</p>
        </div>

        <div className="flex justify-center w-full">
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
