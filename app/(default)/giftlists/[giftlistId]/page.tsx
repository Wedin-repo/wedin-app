import { getEvent } from '@/actions/data/event';
import { getGiftlist } from '@/actions/data/giftlist';
import GiftCard from '@/components/cards/gifts';
import CardContainer from '@/components/cards/shared/card-container';
import EmptyState from '@/components/empty-state';
import CreateWishlistGiftsForm from '@/components/forms/giftlists/create-wishlist-gifts-form';
import { formatPrice } from '@/lib/utils';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';

export type GiftlistPageParams = {
  giftlistId: string;
};

type GiftlistPageProps = {
  params: GiftlistPageParams;
};

export default async function GiftlistPage({ params }: GiftlistPageProps) {
  const { giftlistId } = params;
  const giftlist = await getGiftlist(giftlistId);

  if (!giftlist) return null;

  const { gifts } = giftlist;
  if (gifts?.length === 0 || !gifts)
    return <EmptyState title="No se encontraron regalos" />;

  const event = await getEvent();
  const giftIds = gifts?.map(gift => gift.id);
  const { name, quantity, totalPrice } = giftlist;
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
        </div>

        <div className="flex justify-center w-full">
          <CreateWishlistGiftsForm
            wishlistId={event?.wishlistId}
            giftIds={giftIds}
          />
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        <CardContainer>
          {gifts.map(gift => (
            <GiftCard key={gift.id} gift={gift} hideCursor />
          ))}
        </CardContainer>
      </div>
    </div>
  );
}
