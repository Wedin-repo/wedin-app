import { GetGiftListsParams, getGiftLists } from '@/actions/getGiftLists';
import EmptyState from '@/components/EmptyState';
import GiftListCard from './card';

type GiftListsProps = {
  searchParams: GetGiftListsParams;
};

async function GiftLists({searchParams}: GiftListsProps) {
  const giftLists = await getGiftLists({searchParams});

  if (giftLists?.length === 0 || !giftLists) return <EmptyState title='No se encontraron listas pré-definidas' />;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-8'>
      {giftLists?.map(giftList => (
        <GiftListCard key={giftList.id} giftList={giftList} />
      ))}
    </div>
  );
}

export default GiftLists;
