import { GetGiftsParams } from '@/actions/getGiftsPagination';
import DashboardHeader from './components/dashboard-header';
import WishlistGifts from './components/wishlist-gifts';

type DashboardPageProps = {
  searchParams: GetGiftsParams;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
      <DashboardHeader />

      <WishlistGifts searchParams={searchParams} />
    </div>
  );
}
