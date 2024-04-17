import prisma from '@/db/client';

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    if (!categories) return null;

    return categories;
  } catch (error: any) {
    console.log(error);
    // Maybe throw an error here?
    return null;
  }
}
