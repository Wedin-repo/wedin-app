import { getGiftLists } from '@/actions/giftLists/getGiftLists';
import EmptyState from '@/components/EmptyState';
import GiftListCard from '@/components/cards/gift-lists/card';

async function GiftLists() {
  const giftLists = await getGiftLists();

  if (giftLists?.length === 0) return <EmptyState showReset />;

  return (
    <>
      {giftLists?.map(giftList => (
        <GiftListCard key={giftList.id} giftList={giftList} />
      ))}
    </>
  );
}

export default GiftLists;
