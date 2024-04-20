import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Gift } from '@prisma/client';
import { IoAdd } from 'react-icons/io5';
import AddToWishListForm from './add-to-wishlist-form';
import { formatPrice } from '@/utils/format';

type GiftCardModalProps = {
  gift: Gift;
};

async function GiftCardModal({ gift }: GiftCardModalProps) {
  const { name, description, price, id, imageUrl } = gift;
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);

  const formattedPrice = formatPrice(Number(price));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primaryButton">
          Ver regalo
          <IoAdd size={22} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-4 sm:gap-8 pt-6 lg:pt-0">
          <div className="w-full lg:w-1/2">
            <img
              src={imageUrl?.toString()}
              height={352}
              alt={name}
              className="border rounded-2xl w-full h-[252px] sm:h-[352px] object-cover shadow"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col h-full justify-evenly gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-primaryTextColor text-2xl sm:text-3xl font-medium">
                {name}
              </h1>
              <p className="text-secondaryTextColor text-md sm:text-lg">
                {description}
              </p>
            </div>

            <div className="flex flex-col text-primaryTextColor text-md sm:text-lg gap-3">
              <div className="flex items-center justify-between">
                <p>Marcar como el que más queremos ⭐️</p>
                <Switch id="favorite-gift" />
              </div>
              <div className="flex items-center justify-between">
                <p>Regalo grupal</p>
                <Switch id="group-gift" />
              </div>
              <span className="text-xl sm:text-2xl text-secondaryTitleColor font-medium">
                {formattedPrice}
              </span>
            </div>
            <DialogClose asChild>
              <AddToWishListForm giftId={id} wishlistId={wedding?.wishListId} />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default GiftCardModal;
