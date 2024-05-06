//'use client';

//import { useState } from 'react';
import { getCategories } from '@/actions/data/category';
import { getWedding } from '@/actions/data/wedding';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Gift } from '@prisma/client';
import { FiEdit3 } from 'react-icons/fi';
import EditGiftForm from './edit-gift-form';

type EditGiftModalProps = {
  gift: Gift;
};

async function EditGiftModal({ gift }: EditGiftModalProps) {
  //const [isOpen, setIsOpen] = useState(false);
  const currentUser = await getCurrentUser();
  const wedding = await getWedding(currentUser?.id);
  const wishListId = wedding?.wishListId;
  if (!wishListId) return null;

  const categories = await getCategories();
  if (!categories) return null;

  return (
    <Dialog /* open={isOpen} onOpenChange={setIsOpen} */>
      <DialogTrigger asChild>
        <Button type="button" variant="editIconButton" size="iconButton">
          <FiEdit3 fontSize={'16px'} />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white !rounded-2xl ">
        <EditGiftForm
          gift={gift}
          categories={categories}
          wishlistId={wishListId}
          //setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftModal;
