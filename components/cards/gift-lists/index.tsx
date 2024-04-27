import { GetGiftListsParams, getGiftLists } from '@/actions/getGiftLists';
import EmptyState from '@/components/EmptyState';
import GiftListCard from './card';
import CardContainer from '../shared/card-container';

type GiftListsProps = {
  searchParams: GetGiftListsParams;
};

async function GiftLists({ searchParams }: GiftListsProps) {
  const giftLists = await getGiftLists({ searchParams });

  if (giftLists?.length === 0 || !giftLists)
    return <EmptyState title="No se encontraron listas pré-definidas" />;

  return (
    <CardContainer>
      {giftLists.map(giftList => (
        <GiftListCard key={giftList.id} giftList={giftList} />
      ))}
    </CardContainer>
  );
}

export default GiftLists;
