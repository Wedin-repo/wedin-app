import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { GetGiftsParams } from '@/actions/getGifts';
import Container from '@/components/Container';
import DashboardHeader from './dashboard-header';
import AllGifts from './all-gifts';

type DashboardPageProps = {
  searchParams: GetGiftsParams;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
    
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">

        <DashboardHeader currentUser={currentUser} />

        <AllGifts searchParams={searchParams} currentUser={currentUser} />
      </div>
    </Container>
  );
}
