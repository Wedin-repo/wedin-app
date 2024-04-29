import { GetGiftsParams } from '@/actions/data/gift';
import DashboardHeader from './components/dashboard-header';
import WishlistGifts from './components/wishlist-gifts';

type DashboardPageProps = {
  searchParams: GetGiftsParams;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="flex flex-col justify-start px-4 mt-12 sm:px-10 sm:mt-12 min-h-[90vh]">
      <DashboardHeader />

      <WishlistGifts searchParams={searchParams} />
    </div>
  );
}
