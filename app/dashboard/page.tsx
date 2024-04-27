import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { GetGiftsParams } from '@/actions/getGiftsPagination';
import Container from '@/components/Container';
import AllGifts from './all-gifts';
import DashboardHeader from './dashboard-header';

type DashboardPageProps = {
  searchParams: GetGiftsParams;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect('/login');

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
        <DashboardHeader />

        <AllGifts searchParams={searchParams} />
      </div>
    </Container>
  );
}
