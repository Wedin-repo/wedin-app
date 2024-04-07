'use client';

import { Category } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import CategoryPill from '../../components/CategoryPill';

type CategoryProps = {
  categories: Category[] | null;
};

const Categories = ({ categories }: CategoryProps) => {
  const params = useSearchParams();
  const category_url = params?.get('category');

  return (
    <div className="px-10 flex items-start gap-3 mb-8 sm:mb-10 overflow-x-auto overflow-y-hidden">
      {categories?.map(category => (
        <CategoryPill
          key={category.id}
          id={category.id}
          label={category.name}
          selected={category.id === category_url}
        />
      ))}
    </div>
  );
};

export default Categories;
