'use client';

import CategoryPill from '@/components/category-pill';
import type { Category } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

type CategoryProps = {
  categories: Category[] | null;
};

const Categories = ({ categories }: CategoryProps) => {
  const params = useSearchParams();
  const currentCategory = params?.get('category');

  return (
    <div className="flex overflow-x-auto overflow-y-hidden gap-3 items-start py-2 mb-6 no-scrollbar">
      <CategoryPill
        key="all-gifts"
        id="all-gifts"
        label="Todos"
        selected={!currentCategory}
      />
      {categories?.map(category => (
        <CategoryPill
          key={category.id}
          id={category.id}
          label={category.name}
          selected={category.id === currentCategory}
        />
      ))}
    </div>
  );
};

export default Categories;
