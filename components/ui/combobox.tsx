import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const comboboxVariants = cva('', {
  variants: {
    variant: {
      default: 'relative flex items-center',
      custom: 'relative flex items-center border rounded-md',
    },
    size: {
      default: 'w-full',
      small: 'w-1/2',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const comboboxInputVariants = cva('border p-2 rounded-md', {
  variants: {
    variant: {
      default: 'border-gray-300',
      custom: 'border-blue-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const comboboxListVariants = cva(
  'absolute bg-white border rounded-md mt-1 z-10',
  {
    variants: {
      variant: {
        default: 'border-gray-300',
        custom: 'border-blue-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ComboboxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof comboboxVariants> {
  options: string[];
  selectedOption: string | null;
  onSelect: (value: string) => void;
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    { className, variant, size, options, selectedOption, onSelect, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);

    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <div
        ref={ref}
        className={cn(comboboxVariants({ variant, size, className }))}
        {...props}
      >
        <input
          className={cn(comboboxInputVariants({ variant }))}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Select an option"
        />
        {isOpen && (
          <ul className={cn(comboboxListVariants({ variant }))}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <li
                  key={option}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setInputValue(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found.</li>
            )}
          </ul>
        )}
      </div>
    );
  }
);

Combobox.displayName = 'Combobox';
