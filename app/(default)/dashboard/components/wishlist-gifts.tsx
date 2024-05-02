import Gifts from '@/components/cards/dashboard';
import { DashboardSearchParams } from '../page';

type WishlistGiftsProps = {
  searchParams: DashboardSearchParams;
};

function WishlistGifts({ searchParams }: WishlistGiftsProps) {
  return <Gifts searchParams={searchParams} />;
}

export default WishlistGifts;
