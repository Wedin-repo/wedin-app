import prisma from '@/db/client';

export type GetCategoryParams = {
  categoryId?: string;
};

export async function getCategory({
  searchParams,
}: {
  searchParams?: GetCategoryParams;
}) {
  try {
    let query: any = {};
    const { categoryId } = searchParams ?? {};

    if (categoryId) {
      query.id = categoryId;
    }

    const category = await prisma.category.findUnique({
      where: query,
    });

    return category;
  } catch (error: any) {
    console.error('Error retrieving category:', error);
    return null; // or throw error depending on your error handling strategy
  }
}
