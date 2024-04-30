import SearchBar from '@/components/search-bar';
import DashboardHeader from './components/dashboard-header';
import WishlistGifts from './components/wishlist-gifts';

export type DashboardSearchParams = {
  page?: string;
  name?: string;
};

type DashboardPageProps = {
  searchParams: DashboardSearchParams;
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="flex flex-col justify-start mt-12 sm:mt-12 min-h-[90vh]">
      <DashboardHeader />

      <SearchBar scrollValue={200} scrollValueMobile={250} />

      <WishlistGifts searchParams={searchParams} />
    </div>
  );
}
