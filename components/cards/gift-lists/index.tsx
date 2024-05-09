import { getGiftLists } from '@/actions/data/giftlist';
import type { GetGiftListsSerachParams } from '@/app/(default)/gifts/page';
import EmptyState from '@/components/EmptyState';
import CardContainer from '../shared/card-container';
import GiftListCard from './card';

type GiftListsProps = {
  searchParams: GetGiftListsSerachParams;
};

export default async function GiftLists({ searchParams }: GiftListsProps) {
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
