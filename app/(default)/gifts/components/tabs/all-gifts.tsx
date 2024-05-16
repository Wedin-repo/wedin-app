import GiftsModals from '@/components/modals/gifts';
import type { GiftPageSearchParams } from '../../page';

type AllGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return <GiftsModals searchParams={searchParams} />;
}

export default AllGifts;
