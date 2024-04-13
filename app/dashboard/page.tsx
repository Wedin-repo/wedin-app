import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import { getGifts } from '@/actions/getGifts';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';
import { Switch } from '@/components/ui/switch';
import { IoIosLink } from 'react-icons/io';
import { LuScreenShare } from 'react-icons/lu';
import GiftCard from './GiftCard';
import Search from './Search';
import { formatPrice } from '@/utils/format';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');

  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;
  const gifts = await getGifts({ searchParams: { wishListId: wishListId } });

  const totalPrice =
    gifts?.reduce((acc, gift) => acc + parseFloat(gift.price), 0) || 0;

  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
        <div className="flex flex-col items-center gap-4 w-full ">
          <h1 className="text-4xl font-semibold text-primaryTextColor">
            Mi lista
          </h1>
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

        <div className="my-8">
          <Search />
        </div>

        <div className="flex flex-col gap-5">
          {gifts?.map(gift => <GiftCard key={gift.id} gift={gift} />)}
        </div>
      </div>
    </Container>
  );
}
