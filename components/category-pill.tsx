'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

type CategoryPillProps = {
  id?: string;
  label: string;
  selected?: boolean;
};

const CategoryPill: React.FC<CategoryPillProps> = ({ selected, label, id }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: id,
    };

    if (params?.get('category') === id || id === 'all-gifts') {
      updatedQuery.category = '';
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [id, params, router, pathname]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={handleClick}
      className={`
        rounded-full
        py-1 px-4
        whitespace-nowrap
        overflow
        transition
        border
        cursor-pointer
        hover:bg-primaryBackgroundColor
        hover:text-white
        break-normal
        ${
          selected
            ? 'bg-primaryBackgroundColor text-white'
            : 'bg-white border-secondaryBorderColor text-primaryTextColor'
        }
      `}
    >
      {label}
    </div>
  );
};

export default CategoryPill;
