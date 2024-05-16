import { getEvent } from '@/actions/data/event';
import { getWishListGifts } from '@/actions/data/wishlist-gifts';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';

export default async function GiftsReceivedHeader() {
  const event = await getEvent();

  if (!event) {
    return <EmptyState showReset title="Ocurrió un error al crear tu cuenta" />;
  }
  const wishlistId = event.wishlistId;
  const wishlistGifts = await getWishListGifts({ wishlistId });
  const totalPrice =
    wishlistGifts.reduce(
      (acc, wishlistGift) => acc + Number.parseFloat(wishlistGift.gift.price),
      0
    ) || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h1 className="text-4xl font-semibold text-primaryTextColor">
        Regalos recibidos
      </h1>
      <div className="flex flex-col gap-3 items-center sm:flex-row">
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <IoGiftOutline fontSize={'18px'} />
          {wishlistGifts.length} regalos
        </div>
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <PiWallet fontSize={'18px'} />
          {formattedTotalPrice}
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="mt-4 w-28 border border-borderColor" />

        <div className="flex gap-1 items-center">
          <p className="text-sm text-primaryTextColor">Disponible: </p>
          <span className="text-secondaryTextColor">{formattedTotalPrice}</span>
        </div>

        <div>
          <Button variant="seeMyWalletButton">Ver mi billetera</Button>
        </div>
      </div>
    </div>
  );
}
