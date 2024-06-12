import { useState, useEffect, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

type GiftAmountsFormPriceInputProps = {
  name: string;
};

const GiftAmountsFormPriceInput = ({
  name,
  ...props
}: GiftAmountsFormPriceInputProps) => {
  const { setValue, trigger, watch } = useFormContext();
  const value = watch(name);
  const [displayValue, setDisplayValue] = useState(formatPrice(value || ''));

  useEffect(() => {
    setDisplayValue(formatPrice(value || ''));
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rawValue = unformatPrice(value);
    if (/^\d*$/.test(rawValue)) {
      setDisplayValue(formatPrice(rawValue));
      setValue(name, rawValue, { shouldDirty: true });
      trigger(name);
    }
  };

  return (
    <Input
      value={displayValue}
      onChange={handleChange}
      {...props}
      className="!mt-1"
      placeholder="Ej: Gs. 129,000"
    />
  );
};

const formatPrice = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const unformatPrice = (value: string) => {
  return value.replace(/,/g, '');
};

export default GiftAmountsFormPriceInput;
