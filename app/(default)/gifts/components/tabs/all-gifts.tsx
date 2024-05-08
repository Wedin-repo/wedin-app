import GiftsModals from '@/components/modal/gifts';
import { GetGiftsSearchParams } from '../../page';

type AllGiftsProps = {
  searchParams: GetGiftsSearchParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return <GiftsModals searchParams={searchParams} />;
}

export default AllGifts;
