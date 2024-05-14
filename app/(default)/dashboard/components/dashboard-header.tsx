import { getGifts } from '@/actions/data/gift';
import { getWedding } from '@/actions/data/wedding';
import { Switch } from '@/components/ui/switch';
import { formatPrice } from '@/lib/utils';
import { IoIosLink } from 'react-icons/io';
import { IoGiftOutline } from 'react-icons/io5';
import { LuScreenShare } from 'react-icons/lu';
import { PiWallet } from 'react-icons/pi';

export default async function DashboardHeader() {
  const wedding = await getWedding();
  const wishListId = wedding?.wishListId;
  if (!wishListId) return null;

  const wishlistGifts = await getGifts({
    searchParams: { wishListId: wishListId },
  });

  const totalPrice =
    wishlistGifts?.reduce(
      (acc, gift) => acc + Number.parseFloat(gift.price),
      0
    ) || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h1 className="text-4xl font-semibold text-primaryTextColor">Mi lista</h1>
      <div className="flex flex-col gap-3 items-center sm:flex-row">
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <IoGiftOutline fontSize={'18px'} />
          {wishlistGifts?.length} regalos
        </div>
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-base flex items-center gap-2">
          <PiWallet fontSize={'18px'} />
          {formattedTotalPrice}
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-start w-full sm:flex-row sm:justify-center">
        <div className="flex gap-2 items-center">
          <Switch id="makeVisible" />
          Lista visible a los invitados
        </div>
        <div className="flex gap-2 items-center">
          <IoIosLink fontSize={'18px'} />
          Compartir link de la lista
        </div>
        <div className="flex gap-2 items-center">
          <LuScreenShare fontSize={'18px'} />
          Ver como un invitado
        </div>
      </div>
    </div>
  );
}
