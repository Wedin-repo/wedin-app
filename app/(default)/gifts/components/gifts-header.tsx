import { getCurrentUser } from '@/actions/getCurrentUser';

async function GiftHeader() {
  const currentUser = await getCurrentUser();

  return (
    <>
      {currentUser ? (
        <h1 className="flex justify-center items-center px-10 mt-8 w-full text-4xl font-medium sm:mt-12 sm:text-5xl text-primaryTextColor">
          Agregar regalos
        </h1>
      ) : (
        <h1 className="px-10 mt-8 text-4xl font-medium sm:mt-12 sm:text-5xl text-primaryTextColor">
          Créa tu lista de regalos
        </h1>
      )}
    </>
  );
}

export default GiftHeader;
