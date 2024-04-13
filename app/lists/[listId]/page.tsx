import Container from '@/components/Container';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getGiftList } from '@/actions/getGiftList';
import { getWedding } from '@/actions/getWedding';
import GiftCard from './GiftCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getWishList } from '@/actions/getWishList';
import AddToWishListButton from './AddToWishListButton';
import { getGifts } from '@/actions/getGifts';

type Props = {
  params: {
    listId: string;
  };
};

export default async function PredefinedGiftListPage({ params }: Props) {
  const currentUser = await getCurrentUser();
  const { listId } = params;

  //const giftList = await getGiftList({ id: listId });
  const giftList = await getGiftList(listId);

  const gifts = await getGifts({ searchParams: { giftListId: listId } });
  const giftIds = gifts?.map(gift => gift.id);
  const wedding = await getWedding(currentUser?.id);
  const wishList = await getWishList(wedding?.wishListId);

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
