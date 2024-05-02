import GiftsModals from '@/components/modal/gifts';
import { GetGiftsSerachParams } from '../../page';

type AllGiftsProps = {
  searchParams: GetGiftsSerachParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return <GiftsModals searchParams={searchParams} />;
}

export default AllGifts;
