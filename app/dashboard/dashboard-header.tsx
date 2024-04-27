import { getCurrentUser } from '@/actions/getCurrentUser';
import { getGifts } from '@/actions/getGifts';
import { getWedding } from '@/actions/getWedding';
import { Switch } from '@/components/ui/switch';
import { formatPrice } from '@/utils/format';
import { IoIosLink } from 'react-icons/io';
import { IoGiftOutline } from 'react-icons/io5';
import { LuScreenShare } from 'react-icons/lu';
import { PiWallet } from 'react-icons/pi';

export default async function DashboardHeader() {
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;
  const gifts = await getGifts({ searchParams: { wishListId: wishListId } });

  const totalPrice =
    gifts?.reduce((acc, gift) => acc + parseFloat(gift.price), 0) || 0;
  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h1 className="text-4xl font-semibold text-primaryTextColor">Mi lista</h1>
      <div className="flex items-center gap-3">
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-md flex items-center gap-2">
          <IoGiftOutline fontSize={'18px'} />
          {gifts?.length} regalos
        </div>
        <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-md flex items-center gap-2">
          <PiWallet fontSize={'18px'} />
          {formattedTotalPrice}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-start sm:justify-center w-full gap-4">
        <div className="flex items-center gap-2">
          <Switch id="makeVisible" />
          Lista visible a los invitados
        </div>
        <div className="flex items-center gap-2">
          <IoIosLink fontSize={'18px'} />
          Compartir link de la lista
        </div>
        <div className="flex items-center gap-2">
          <LuScreenShare fontSize={'18px'} />
          Ver como un invitado
        </div>
      </div>
    </div>
  );
}
