import { createWishlistGift } from '@/actions/data/wishlist-gifts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { WishlistGiftCreateSchema } from '@/schemas/form';
import type { Event } from '@prisma/client';
import { redirect, useRouter } from 'next/navigation';
import { IoGiftOutline } from 'react-icons/io5';
import WishlistFormButton from './wishlist-form-button';

type CreateWishlistFormProps = {
  event: Event | null;
  giftId: string;
  isFavoriteGift?: boolean;
  isGroupGift?: boolean;
  variant?: string;
  setIsOpen?: (value: boolean) => void;
};

function CreateWishlistGiftForm({
  event,
  giftId,
  isFavoriteGift = false,
  isGroupGift = false,
  variant,
  setIsOpen,
}: CreateWishlistFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddGiftToWishlist = async () => {
    if (!event) {
      toast({
        title: 'Parece que no tienes cuenta',
        description:
          'Create una cuenta o inicia sesión para poder agregar regalos a tu lista.',
        className: 'bg-white',
      });

      redirect('/register');
    }

    const { wishlistId, id } = event;

    const validatedFields = WishlistGiftCreateSchema.safeParse({
      eventId: id,
      wishlistId,
      giftId,
    });

    if (!validatedFields.success) {
      toast({
        title: 'Error',
        description: 'Error al agregar el regalo a la lista',
        variant: 'destructive',
      });

      return;
    }

    const response = await createWishlistGift({
      ...validatedFields.data,
      isFavoriteGift,
      isGroupGift,
    });

    if (response?.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });

      return;
    }

    if (variant !== 'undoButton') {
      toast({
        title: 'Exito! 🎁🎉',
        description: 'Regalo creado y agregado a tu lista.',
        action: (
          <Button
            onClick={() => router.push('/dashboard?page=1')}
            variant="outline"
            className="gap-1 px-3 h-8 hover:text-white border-borderColor hover:bg-primaryBackgroundColor"
          >
            <IoGiftOutline />
            Ver lista
          </Button>
        ),
        className: 'bg-white',
      });
    }

    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <form action={handleAddGiftToWishlist}>
      <input id="giftId" type="hidden" name="giftId" value={giftId} />
      <WishlistFormButton variant={variant} />
    </form>
  );
}

export default CreateWishlistGiftForm;
