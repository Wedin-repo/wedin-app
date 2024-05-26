'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from './scroll-area';

export type ComboboxOptions = {
  value: string;
  label: string;
};

type Mode = 'single' | 'multiple';

interface ComboboxProps {
  mode?: Mode;
  options: ComboboxOptions[];
  selected: string | string[];
  className?: string;
  placeholder?: string;
  onChange?: (event: string | string[]) => void;
  onCreate?: (value: string) => void;
}

export function Combobox({
  options,
  selected,
  className,
  placeholder,
  mode = 'single',
  onChange,
  onCreate,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>('');

  // console.log('Combobox options:', options);
  // console.log('Combobox selected:', selected);

  const handleSelect = (value: string) => {
    if (onChange) {
      if (mode === 'multiple' && Array.isArray(selected)) {
        onChange(
          selected.includes(value)
            ? selected.filter(item => item !== value)
            : [...selected, value]
        );
      } else {
        onChange(value);
      }
    }
  };

  const handleCreate = () => {
    if (onCreate && !options.some(option => option.value === query)) {
      onCreate(query);
      setQuery('');
    }
  };

  const renderSelectedItems = () => {
    if (mode === 'multiple' && Array.isArray(selected)) {
      return selected
        .map(
          selectedValue =>
            options.find(item => item.value === selectedValue)?.label
        )
        .filter(Boolean)
        .join(', ');
    }
    if (mode === 'single' && typeof selected === 'string') {
      return options.find(item => item.value === selected)?.label;
    }
    return '';
  };

  return (
    <div className={cn('block', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            key="combobox-trigger"
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls="combobox-list"
            className="w-full justify-between"
          >
            {selected && selected.length > 0 ? (
              <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden">
                <span>{renderSelectedItems()}</span>
              </div>
            ) : (
              <p className="font-normal">{placeholder ?? 'Select Item...'}</p>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 max-w-sm p-0 bg-white">
          <Command filter={(value, search) => (value.includes(search) ? 1 : 0)}>
            <CommandInput
              placeholder={placeholder ?? 'Search Item...'}
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty
              //onClick={handleCreate}
              className="flex items-center justify-center gap-1 italic py-2"
            >
              <p>No se encontraron resultados</p>
              {/* <p>Create: </p>
              <p className="block max-w-48 truncate font-semibold text-primary">
                {query}
              </p> */}
            </CommandEmpty>
            <ScrollArea>
              <div className="max-h-80">
                <CommandGroup>
                  <CommandList>
                    {options.map(option => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => handleSelect(option.value)}
                        className="cursor-pointer hover:bg-secondaryBackgroundColor border-b-[1px]"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selected.includes(option.value)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </div>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
