import { getCurrentUser } from '@/actions/getCurrentUser';
import { getGiftList } from '@/actions/getGiftList';
import { getGifts } from '@/actions/getGifts';
import { getWedding } from '@/actions/getWedding';
import Container from '@/components/Container';
import Gifts from '@/components/cards/gifts';
import { formatPrice } from '@/utils/format';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { IoGiftOutline } from 'react-icons/io5';
import { PiWallet } from 'react-icons/pi';
import AddToWishListButton from './AddToWishListButton';

type GiftListPageProps = {
  params: {
    listId: string;
  };
};

export default async function GiftListPage({ params }: GiftListPageProps) {
  const { listId } = params;
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const giftList = await getGiftList(listId);
  const gifts = await getGifts({ searchParams: { giftListId: listId } });
  const giftIds = gifts?.map(gift => gift.id);

  if (!giftList) return null;

  const { name, quantity, totalPrice, description } = giftList;
  const formattedPrice = formatPrice(Number(totalPrice));

  return (
    <Container>
      <div className="flex flex-col min-h-[90vh] justify-start mt-12 sm:mt-12 px-6 sm:px-10">
        <div className="flex flex-col w-full items-center gap-4">
          <div className="flex flex-col items-center gap-3 w-full ">
            <h1 className="text-4xl font-medium text-primaryTextColor text-center">
              {name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="bg-secondaryBackgroundColor rounded-full py-1.5 px-4 flex items-center gap-2">
                <IoGiftOutline fontSize={'18px'} />
                {quantity} regalos
              </div>
              <div className="bg-secondaryBackgroundColor rounded-full py-1.5 px-4 flex items-center gap-2">
                <PiWallet fontSize={'18px'} />
                {formattedPrice}
              </div>
            </div>
            <p className="text-xl text-center">{description}</p>
          </div>

          <div className="w-full flex justify-center">
            <AddToWishListButton
              currentUser={currentUser}
              wishListId={wedding?.wishListId}
              giftIds={giftIds}
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-10">
          <Suspense
            fallback={
              <div className="min-h-[50vh] flex items-center justify-center">
                <Loader2 className="h-20 w-20 animate-spin text-secondaryBorderColor" />
              </div>
            }
          >
            <Gifts searchParams={{ giftListId: listId }} hideButton />
          </Suspense>
        </div>
      </div>
    </Container>
  );
}
