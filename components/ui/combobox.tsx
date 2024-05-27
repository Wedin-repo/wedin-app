'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LuPlusCircle } from 'react-icons/lu';
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
interface ComboboxProps {
  options: ComboboxOptions[];
  selected: string;
  className?: string;
  placeholder?: string;
  onChange?: (event: string | string[]) => void;
  onCreate?: (value: string) => void;
  width?: string;
  searchPlaceholder?: string;
}

export function Combobox({
  options,
  selected,
  className,
  placeholder,
  onChange,
  onCreate,
  width,
  searchPlaceholder,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string>('');

  const handleSelect = (value: string) => {
    if (onChange) {
      onChange(value);
    }
    setOpen(false);
  };

  const handleCreate = () => {
    if (onCreate && !options.some(option => option.value === query)) {
      onCreate(query);
      setQuery('');
    }
  };

  const renderSelectedItems = () => {
    return options.find(item => item.value === selected)?.label || '';
  };

  return (
    <div className={cn('block', className)}>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
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
            {selected ? (
              <div className="relative mr-auto font-normal text-base flex flex-grow flex-wrap items-center overflow-hidden">
                <span>{renderSelectedItems()}</span>
              </div>
            ) : (
              <p className="font-normal text-base">
                {placeholder ?? 'Select Item...'}
              </p>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${width} max-w-sm p-0 bg-white`}>
          <Command
            filter={(value, search) =>
              value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
            }
          >
            <CommandInput
              placeholder={placeholder ?? 'Search Item...'}
              value={query}
              onValueChange={setQuery}
            />
            <CommandEmpty
              onClick={handleCreate}
              className="flex flex-col items-center justify-center gap-1 py-3"
            >
              <p className="text-sm font-normal">
                No se encontraron resultados 😢
              </p>
              {onCreate && query && (
                <div className="flex items-center gap-2">
                  <p className="flex items-center gap-1 cursor-pointer">
                    Crear
                    <LuPlusCircle />:
                  </p>
                  <p className="block max-w-48 truncate font-semibold text-primary">
                    {query}
                  </p>
                </div>
              )}
            </CommandEmpty>
            <ScrollArea>
              <div className="max-h-80">
                <CommandGroup>
                  <CommandList>
                    {options
                      .filter(option =>
                        option.label.toLowerCase().includes(query.toLowerCase())
                      )
                      .map(option => (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => handleSelect(option.value)}
                          className="cursor-pointer hover:bg-secondaryBackgroundColor border-b-[1px]"
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selected === option.value
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
