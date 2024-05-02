import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import GiftLists from '@/components/cards/gift-lists';

type DefaultGiftListsProps = {
  searchParams: GiftPageSearchParams;
};

async function DefaultGiftLists({ searchParams }: DefaultGiftListsProps) {
  return <GiftLists searchParams={searchParams} />;
}

export default DefaultGiftLists;
