'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';

type CategoryPillProps = {
  key: string;
  id: string;
  label: string;
  selected?: boolean;
};

const CategoryPill: React.FC<CategoryPillProps> = ({ selected, label, id }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: id,
    };

    if (params?.get('category') === id) {
      updatedQuery.category = '';
    }

    const url = qs.stringifyUrl(
      {
        url: '/gifts',
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [id, params, router]);

  return (
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
          selected ? 'bg-primaryBackgroundColor' : 'border-secondaryBorderColor'
        }
        ${selected ? 'text-white' : 'text-primaryTextColor'}
      `}
    >
      {label}
    </div>
  );
};

export default CategoryPill;
