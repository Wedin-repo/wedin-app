import Container from '@/components/Container';
//import { redirect, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { Button } from '@/components/ui/button';
import { GoArrowRight } from 'react-icons/go';
import { getGiftListById } from '@/actions/giftLists/getGiftListById';
import { getGiftsByGiftListId } from '@/actions/gift/getGiftsByGiftListId';
import GiftCard from './GiftCard';
import { useToast } from '@/components/ui/use-toast';
import { FaCheck } from 'react-icons/fa6';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type Props = {
  params: {
    listId: string;
  };
};

export default async function PredefinedGiftListPage({ params }: Props) {
  const { listId } = params;
  const giftList = await getGiftListById(listId);
  const gifts = await getGiftsByGiftListId(listId);
  //const router = useRouter();
  //const { toast } = useToast();

  const { name, quantity, totalPrice, description } = giftList ?? {
    name: '',
    quantity: '',
    totalPrice: '',
    description: '',
  };
  const currentUser = await getCurrentUser();

  const addGiftToWishListHandler = async () => {
    if (!currentUser) {
      //router.push('/register');
      return;
    }
    try {
      /* const response = await fetch(`/api/wishList/${wishListId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          giftId: id,
        }),
      }); */
      /* if (response.ok) {
        toast({
          title: 'Success',
          description: 'Lista agregada a tu wishlist.',
          action: <FaCheck color="green" fontSize={'36px'} />,
          className: 'bg-white',
        });
      } else {
        throw new Error('Failed to add gift to wishlist');
      } */
    } catch (error) {
      console.error(error);
      /* toast({
        title: 'Error',
        description: 'Failed to add gift to wishlist.',
        action: <FaCheck color="red" fontSize={'36px'} />,
        className: 'bg-white',
      }); */
    }
  };

  return (
    <Container>
      <div className="min-h-[90vh] flex flex-col justify-start mt-12 sm:mt-12 px-4 sm:px-10">
        <Breadcrumb className='mb-6'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/gifts">Listas pré definidas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-0">
          <div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-2/3">
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
            <p className="text-xl">
              Elegí esta lista pré-definida, podes personalizarla más adelante
              {/* {description} */}
            </p>
          </div>

          <div className="w-full sm:w-1/3 flex justify-start sm:justify-end">
            <Button
              variant="chooseGiftListButton"
              size="chooseGiftListButton"
            >
              Elegir lista <GoArrowRight fontSize={'24px'} />
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
            {gifts?.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
