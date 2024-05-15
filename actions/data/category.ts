'use server';

import prisma from '@/db/client';

export async function getCategories() {
  try {
    return await prisma.category.findMany();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export type GetCategoryParams = {
  categoryId?: string;
};

export async function getCategory({
  searchParams,
}: {
  searchParams?: GetCategoryParams;
}) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const query: any = {};
  const { categoryId } = searchParams ?? {};

  if (categoryId) {
    query.id = categoryId;
  }
  try {
    return await prisma.category.findUnique({
      where: query,
    });
  } catch (error) {
    console.error('Error retrieving category:', error);
    return null;
  }
}
