import { type GetGiftsParams, getGifts } from '@/actions/data/gift';
import { getGiftList } from '@/actions/data/giftlist';
import { getEvent } from '@/actions/data/event';
import GiftsCards from '@/components/cards/gifts';
import { formatPrice } from '@/lib/utils';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';
import AddToWishlistForm from './add-to-wishlist-form';

export type GiftListPageParams = Pick<GetGiftsParams, 'giftlistId'>;

type GiftListPageProps = {
  params: GiftListPageParams;
};

export default async function GiftListPage({ params }: GiftListPageProps) {
  const { giftlistId } = params;

  if (!giftlistId) return null;

  const giftList = await getGiftList(giftlistId);

  if (!giftList) return null;

  const event = await getEvent();
  const gifts = await getGifts({ searchParams: { giftlistId } });
  const giftIds = gifts?.map(gift => gift.id);
  const { name, quantity, totalPrice, description } = giftList;
  const formattedPrice = formatPrice(Number(totalPrice));

  return (
    <div className="flex flex-col justify-start mt-12 sm:px-10 sm:mt-12">
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
          <AddToWishlistForm wishlistId={event?.wishListId} giftIds={giftIds} />
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        <GiftsCards searchParams={{ giftlistId }} />
      </div>
    </div>
  );
}
