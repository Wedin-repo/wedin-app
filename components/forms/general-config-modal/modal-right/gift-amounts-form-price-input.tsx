import { useState, ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';

type GiftAmountsFormPriceInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const GiftAmountsFormPriceInput = ({
  value,
  onChange,
  ...props
}: GiftAmountsFormPriceInputProps) => {
  const [displayValue, setDisplayValue] = useState(formatPrice(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rawValue = unformatPrice(value);
    if (/^\d*$/.test(rawValue)) {
      setDisplayValue(formatPrice(rawValue));
      onChange(rawValue);
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
