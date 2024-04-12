import Container from '@/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getGiftListById } from '@/actions/giftLists/getGiftListById';
import { getWeddingByUserId } from '@/actions/weddings/getWeddingByUserId';
import GiftCard from './GiftCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getWishListByWeddingId } from '@/actions/wishList/getWishListByWeddingId';
import AddToWishListButton from './AddToWishListButton';
import { getGifts } from '@/actions/gift/getGifts';

type Props = {
  params: {
    listId: string;
  };
};

export default async function PredefinedGiftListPage({ params }: Props) {
  const currentUser = await getCurrentUser();
  const { listId } = params;

  //const giftList = await getGiftList({ id: listId });
  const giftList = await getGiftListById(listId);

  const gifts = await getGifts({ searchParams: { giftListId: listId } });
  const giftIds = gifts?.map(gift => gift.id);
  const wedding = await getWeddingByUserId(currentUser?.id);
  const wishList = await getWishListByWeddingId(wedding?.wishListId);

  if (!giftList) return null;

  const { name, quantity, totalPrice } = giftList;

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
        {/* <Breadcrumb className='mb-6'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/gifts">Listas pré-definidas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}

        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3 w-full ">
            <h1 className="text-4xl font-medium text-primaryTextColor">
              {name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-sm">
                {quantity} regalos
              </div>
              <div className="bg-[#F2F2F2] rounded-full py-1.5 px-4 text-sm">
                Gs. {totalPrice}
              </div>
            </div>
            <p className="text-xl text-center">
              Elegí esta lista pré-definida, podes personalizarla más adelante
            </p>
          </div>

          <div className="w-full flex justify-center">
            <AddToWishListButton currentUser={currentUser} wishList={wishList} giftIds={giftIds} />
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6">
            {gifts?.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
