import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import { getGifts, GetGiftsParams } from '@/actions/getGifts';
import { formatPrice } from '@/utils/format';
import DashboardHeader from './dashboard-header';
import AllGifts from './all-gifts';
import GiftCard from '@/components/cards/dashboard/card';

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');

  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;

  if (!wishListId) redirect('/gifts');

  const gifts = await getGifts({ searchParams: { wishListId: wishListId } });

  const totalPrice = gifts?.reduce((acc, gift) => acc + parseFloat(gift.price), 0) || 0;

  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">

        <DashboardHeader quantity={gifts?.length} formattedTotalPrice={formattedTotalPrice} />

        <AllGifts searchParams={wishListId as GetGiftsParams} />
      </div>
    </Container>
  );
}
