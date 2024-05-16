import { getGifts } from '@/actions/data/gift';
import { getEvent } from '@/actions/data/event';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { formatPrice } from '@/lib/utils';
import { PiWallet } from 'react-icons/pi';
import { IoGiftOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';

export default async function GiftsReceivedHeader() {
  const wedding = await getEvent();
  const wishlistId = wedding?.wishlistId;

  if (!wishlistId) return null;

  const wishlistGifts = await getGifts({ searchParams: { wishlistId } });

  const totalPrice =
    wishlistGifts?.reduce((acc, gift) => acc + parseFloat(gift.price), 0) || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h1 className="text-4xl font-semibold text-primaryTextColor">
        Regalos recibidos
      </h1>
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <IoGiftOutline fontSize={'18px'} />
          {wishlistGifts?.length} regalos
        </div>
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <PiWallet fontSize={'18px'} />
          {formattedTotalPrice}
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center w-full">
        <div className="border border-borderColor w-28 mt-4"></div>

        <div className="flex items-center gap-1">
          <p className="text-primaryTextColor text-sm">Disponible: </p>
          <span className=" text-secondaryTextColor">
            {formattedTotalPrice}
          </span>
        </div>

        <div>
          <Button variant="seeMyWalletButton">Ver mi billetera</Button>
        </div>
      </div>
    </div>
  );
}
