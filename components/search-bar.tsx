'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDebounceCallback } from 'usehooks-ts';

type SearchBarProps = {
  scrollValue?: number;
  scrollValueMobile?: number;
};

function SearchBar({
  scrollValue = 110,
  scrollValueMobile = 120,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounce = useDebounceCallback(handleSearchTitle, 1000);
  const name = searchParams.get('name') ?? '';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleSearchTitle(value: string) {
    const sp = new URLSearchParams(searchParams);

    if (value.trim() === '') {
      sp.delete('name');
    } else {
      sp.set('name', value);
      sp.set('page', '1');
    }

    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  }

  function handleScroll() {
    const targetScrollValue = isMobile ? scrollValueMobile : scrollValue;
    if (Math.abs(window.scrollY - targetScrollValue) > 5) {
      window.scrollTo({
        top: targetScrollValue,
        behavior: 'smooth',
      });
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleScroll();
    debounce(e.target.value);
  }

  return (
    <div className="flex gap-2 items-center py-1.5 pr-1.5 pl-4 my-8 rounded-full md:w-auto bg-secondaryBackgroundColor">
      <BiSearch fontSize={'22px'} />
      <Input
        className="pl-2 text-base bg-transparent rounded-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Buscar"
        onFocus={handleScroll} // Trigger scroll when the input is focused
        onChange={handleInputChange} // Also trigger scroll when typing
        defaultValue={name}
      />
    </div>
  );
}

export default SearchBar;
