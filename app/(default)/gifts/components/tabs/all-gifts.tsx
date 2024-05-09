import GiftsModals from '@/components/modals/gifts';
import type { GetGiftsSearchParams } from '../../page';

type AllGiftsProps = {
  searchParams: GetGiftsSearchParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return <GiftsModals searchParams={searchParams} />;
}

export default AllGifts;
