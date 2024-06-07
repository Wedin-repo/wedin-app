import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import type { z } from 'zod';

type IdentificationNumberFieldProps = {
  field: ControllerRenderProps<any, 'identificationNumber'>;
  disabled?: boolean;
};

const IdentificationNumberField = ({
  field,
  disabled = false,
}: IdentificationNumberFieldProps) => {
  const [displayValue, setDisplayValue] = useState(field.value);

  useEffect(() => {
    setDisplayValue(formatIdentificationNumber(field.value));
  }, [field.value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = formatIdentificationNumber(rawValue);

    setDisplayValue(formattedValue);
    field.onChange(rawValue);
  };

  const formatIdentificationNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <FormItem className="w-full">
      <FormLabel>Número de documento</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder="Ej. 4.705.899"
          value={displayValue}
          onChange={handleInputChange}
          disabled={disabled}
        />
      </FormControl>
      <FormMessage className="font-normal text-red-600" />
    </FormItem>
  );
};

export default IdentificationNumberField;
