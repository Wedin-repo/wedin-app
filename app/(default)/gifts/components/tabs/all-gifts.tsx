import Gifts from '@/components/cards/gifts';
import { GiftPageSearchParams } from '../../page';

type AllGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function AllGifts({ searchParams }: AllGiftsProps) {
  return <Gifts searchParams={searchParams} />;
}

export default AllGifts;
