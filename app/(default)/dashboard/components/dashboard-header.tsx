import { getEvent } from '@/actions/data/event';
import { getWishlistGifts } from '@/actions/data/wishlist-gifts';
import { Switch } from '@/components/ui/switch';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { IoIosLink } from 'react-icons/io';
import { IoGiftOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuScreenShare } from 'react-icons/lu';
import { PiWallet } from 'react-icons/pi';
import WishlistConfigModal from '@/components/modals/wishlist-config-modal';

type DashboardHeaderProps = {
  wishlistId: string;
};

export default async function DashboardHeader({
  wishlistId,
}: DashboardHeaderProps) {
  const wishlistGifts = await getWishlistGifts({ wishlistId });

  const totalPrice =
    wishlistGifts?.reduce(
      (acc, wishlistGift) => acc + Number.parseFloat(wishlistGift.gift.price),
      0
    ) || 0;
  const formattedTotalPrice = formatPrice(totalPrice);
  const event = await getEvent();

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
        <WishlistConfigModal />
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
        <Link
          href={`/events/${event?.url}`}
          className="flex gap-2 items-center"
        >
          <LuScreenShare fontSize={'18px'} />
          Ver como un invitado
        </Link>
      </div>
    </div>
  );
}
