import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import { useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

const PriceField = ({
  field,
}: {
  field: ControllerRenderProps<
    {
      name: string;
      categoryId: string;
      price: string;
      isFavoriteGift: boolean;
      isGroupGift: boolean;
      wishlistId: string;
      eventId: string;
      imageUrl: File;
    },
    'price'
  >;
}) => {
  const [displayValue, setDisplayValue] = useState(
    formatPrice(Number(field.value))
  );

  useEffect(() => {
    setDisplayValue(formatPrice(Number(field.value)));
  }, [field.value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = Number(rawValue);
    const formattedValue = formatPrice(numericValue);

    setDisplayValue(formattedValue);
    field.onChange(rawValue);
  };

  return (
    <FormItem className="w-full">
      <FormLabel>Precio</FormLabel>
      <FormControl>
        <Input type="text" value={displayValue} onChange={handleInputChange} />
      </FormControl>
      <FormMessage className="font-normal text-red-600" />
    </FormItem>
  );
};

export default PriceField;
