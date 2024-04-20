'use client';

import { Input } from '@/components/ui/input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounceCallback } from 'usehooks-ts';
import { BiSearch } from 'react-icons/bi';

type SearchProps = {
};

function SearchBar({}: SearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debounce = useDebounceCallback(handleSearchTitle, 1000)

  const name = searchParams.get('name') ?? '';

  function handleSearchTitle(value: string) {
    const sp = new URLSearchParams(searchParams);

    if (value.trim() === '') {
      sp.delete('name');
    } else {
      sp.set('name', value);
    }
    router.push(`${pathname}?${sp.toString()}`);
  }

  return (
    <div className="bg-[#F2F2F2] w-full md:w-auto py-1.5 pl-4 pr-1.5 rounded-full flex items-center gap-2">
      <BiSearch fontSize={'22px'} />
      <Input
        className="bg-transparent border-0 rounded-full text-md pl-2 text-primaryTextColor focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Buscar"
        onChange={(e) => debounce(e.target.value)}
        defaultValue={name}
      />
    </div>
  );
}

export default SearchBar;
