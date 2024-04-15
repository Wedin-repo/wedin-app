'use client';

import { Input } from '@/components/ui/input';
import { Gift } from '@prisma/client';
import { formatPrice } from '@/utils/format';
import EditGiftFromWishListForm from './edit-gift-from-wishlist-form';
import { Category } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

type EditGiftFormProps = {
  gift: Gift;
  wishlistId?: string | null;
  categories?: string[] | Category[] | null;
};

function EditGiftForm({ gift, wishlistId, categories }: EditGiftFormProps) {
  const { name, description, price, id, categoryId, isDefault, wishListIds } =
    gift;
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(categoryId);
  const [isFavoriteGift, setIsFavoriteGift] = useState(isDefault);
  const [isGroupGift, setIsGroupGift] = useState(false);

  const formattedPrice = formatPrice(Number(price));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      editedName,
      editedPrice,
      editedCategory,
      isFavoriteGift,
      isGroupGift,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <Label className='!mb-1.5'>Nombre</Label>
          <Input
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            placeholder={name}
            type='text'
          />
        </div>

        {categoryId && (
          <div>
            <Label className='!mb-1.5'>Categoria</Label>

            <Select value={editedCategory} onValueChange={setEditedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories?.map(category => (
                  <div key={category.id}>
                    <SelectItem
                      value={category.name}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </SelectItem>
                    {/* this is just a border for aesthetic purposes */}
                    <div
                      className="border border-b-secondaryBorderColor flex items-center w-5/6 justify-center"
                      style={{ margin: '0 auto' }}
                    ></div>
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label className='!mb-1.5'>Precio</Label>
          <Input
            type="number"
            placeholder={formattedPrice}
            value={editedPrice}
            onChange={e => setEditedPrice(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="font-normal text-md">
            Marcar como el que más queremos ⭐️
          </Label>
          <Switch
            checked={isFavoriteGift}
            onCheckedChange={setIsFavoriteGift}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label className="font-normal text-md">Regalo grupal</Label>
          <Switch checked={isGroupGift} onCheckedChange={setIsGroupGift} />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <EditGiftFromWishListForm />
      </div>
    </form>
  );
}

export default EditGiftForm;
