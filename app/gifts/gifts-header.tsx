import { getCurrentUser } from '@/actions/getCurrentUser';
import React from 'react';

async function GiftHeader() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      {currentUser ? (
        <h1 className="text-3xl sm:text-4xl font-semibold text-primaryTextColor px-10 mt-12 sm:mt-16 flex w-full items-center justify-center">
          Agregar regalos
        </h1>
      ) : (
        <h1 className="text-4xl sm:text-5xl font-medium text-primaryTextColor px-10 mt-12 sm:mt-16">
          Créa tu lista de regalos
        </h1>
      )}
    </div>
  );
}

export default GiftHeader;
