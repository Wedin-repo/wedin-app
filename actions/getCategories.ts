import prisma from '@/db/client';

export async function getCategories() {
  try {
    const category = await prisma.category.findMany();

    if (!category) return null;

    return category;
  } catch (error: any) {
    console.log(error);
    // Maybe throw an error here?
    return null;
  }
}
