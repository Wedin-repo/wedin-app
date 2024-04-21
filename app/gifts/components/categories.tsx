'use client';

import CategoryPill from '@/components/CategoryPill';
import { Category } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

type CategoryProps = {
  categories: Category[] | null;
};

const Categories = ({ categories }: CategoryProps) => {
  const params = useSearchParams();
  const category_url = params?.get('category');

  return (
    <div className="flex items-start gap-3 mb-6 sm:mb-8 overflow-x-auto overflow-y-hidden">
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
