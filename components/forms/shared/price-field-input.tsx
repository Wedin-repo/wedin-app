import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/utils';
import type { GiftFormSchema, TransactionCreateSchema } from '@/schemas/form';
import { useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { z } from 'zod';

type PriceFieldProps = {
  field:
    | ControllerRenderProps<z.infer<typeof GiftFormSchema>, 'price'>
    | ControllerRenderProps<z.infer<typeof TransactionCreateSchema>, 'amount'>;
};

const PriceField = ({ field }: PriceFieldProps) => {
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
