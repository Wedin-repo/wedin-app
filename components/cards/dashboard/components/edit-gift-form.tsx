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
import { editGiftInWishList } from '@/actions/edit-gift-from-wishlist';
import { FaCheck } from 'react-icons/fa6';
import { toast } from '@/components/ui/use-toast';
import { getCurrentUser } from '@/actions/getCurrentUser';
import { getWedding } from '@/actions/getWedding';

type EditGiftFormProps = {
  gift: Gift;
  wishlistId?: string | null;
  categories?: string[] | Category[] | null;
  category: Category | null;
};

function EditGiftForm({ gift, categories, category, wishlistId }: EditGiftFormProps) {
  const { name, description, price, id, isDefault, wishListIds } =
    gift;
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedCategory, setEditedCategory] = useState(category?.name);
  const [isFavoriteGift, setIsFavoriteGift] = useState(isDefault);
  const [isGroupGift, setIsGroupGift] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('giftId', id);
    formData.append('name', editedName);
    formData.append('category', editedCategory ?? '');
    formData.append('price', editedPrice);
    formData.append('isFavoriteGift', isFavoriteGift.toString());
    formData.append('isGroupGift', isGroupGift.toString());

    const editGiftWithId = editGiftInWishList.bind(null, wishlistId || '');
    const response = await editGiftWithId(formData);

    console.log('first', formData.values);
    console.log(response);

    toast({
      title: response.status,
      description: response.message,
      action: (
        <FaCheck
          color={response.status === 'Error' ? 'red' : 'green'}
          fontSize="36px"
        />
      ),
      className: 'bg-white',
    });
    setIsLoading(false);
  };

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col gap-3 sm:gap-5">
        <div>
          <Label className="">Nombre</Label>
          <Input
            value={editedName}
            onChange={e => setEditedName(e.target.value)}
            placeholder={name}
            type="text"
          />
        </div>

  
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
      <div className="w-full flex justify-center mt-4 sm:mt-8">
        <EditGiftFromWishListForm isLoading={isLoading} />
      </div>
    </form>
  );
}

export default EditGiftForm;
