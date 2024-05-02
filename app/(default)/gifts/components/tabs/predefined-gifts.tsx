import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import GiftLists from '@/components/cards/gift-lists';

type PredefinedGiftsProps = {
  searchParams: GiftPageSearchParams;
};

async function PredefinedGifts({ searchParams }: PredefinedGiftsProps) {
  return <GiftLists searchParams={searchParams} />;
}

export default PredefinedGifts;
