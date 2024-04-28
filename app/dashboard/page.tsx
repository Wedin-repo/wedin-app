import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { GetGiftsParams } from '@/actions/getGiftsPagination';
import { auth } from '@/auth';
import Container from '@/components/Container';
import AllGifts from './all-gifts';
import DashboardHeader from './dashboard-header';

type DashboardPageProps = {
  searchParams: GetGiftsParams;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const session = await auth();
  console.log('session', JSON.stringify(session));
  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
        <DashboardHeader />

        <AllGifts searchParams={searchParams} />
      </div>
    </Container>
  );
}
