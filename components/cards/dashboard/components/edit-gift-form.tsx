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
  category: Category | null;
};

function EditGiftForm({ gift, wishlistId, categories, category }: EditGiftFormProps) {
  const { name, description, price, id, categoryId, isDefault, wishListIds } =
    gift;
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(formatPrice(Number(price)));
  const [editedCategory, setEditedCategory] = useState(category?.name);
  const [isFavoriteGift, setIsFavoriteGift] = useState(isDefault);
  const [isGroupGift, setIsGroupGift] = useState(false);

  const formattedPrice = formatPrice(Number(price));

  const handlePriceInput = (event: any) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedInput = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setEditedPrice(formattedInput);
  };

  const handlePriceKeyPress = (event: any) => {
    if (
      !/[0-9]/.test(event.key) &&
      event.keyCode !== 8 &&
      event.keyCode !== 46
    ) {
      event.preventDefault();
    }
  };

  //console.log(category);

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
      <div className="flex flex-col gap-5">
        <div>
          <Label className="">Nombre</Label>
          <Input
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            placeholder={name}
            type="text"
          />
        </div>

        {categoryId && (
          <div>
            <Label className="">Categoria</Label>

            <Select value={editedCategory} onValueChange={setEditedCategory}>
              <SelectTrigger>
                <SelectValue />
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
          <Label className="">Precio</Label>
          <Input
            type="text"
            placeholder={formattedPrice}
            value={editedPrice}
            onInput={handlePriceInput}
            onKeyPress={handlePriceKeyPress}
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
      <div className="w-full flex justify-center mt-8">
        <EditGiftFromWishListForm />
      </div>
    </form>
  );
}

export default EditGiftForm;
