import GiftsModals from '@/components/modal/gifts';
import { GiftPageSearchParams } from '../../page';

type AllGiftsProps = {
  searchParams: GiftPageSearchParams;
};

function AllGifts({ searchParams }: AllGiftsProps) {
  return <GiftsModals searchParams={searchParams} />;
}

export default AllGifts;
