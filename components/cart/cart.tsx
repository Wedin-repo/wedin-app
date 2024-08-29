'use client';

import { useCart } from '@/lib/context/cart-context';
import { CartModal } from '@/components/modals/cart-modal';
import { formatPrice } from '@/lib/utils';

export const Cart = () => {
  const { state } = useCart();

  if (state.items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primaryBackgroundColor h-32 px-12 sm:px-10 text-white">
      <div className="flex items-center justify-between h-full w-full">
        <div>
          <p className="text-lg font-light">
            {state.items.length} regalo{state.items.length > 1 && 's'} en el
            carrito
          </p>
        </div>
        <div className="flex justify-between items-center gap-8">
          <div className="flex flex-col items-start">
            <p className="font-light">Total</p>
            <p className="text-lg">
              {formatPrice(
                state.items.reduce(
                  (total, item) => total + item.amountToGift,
                  0
                )
              )}
            </p>
          </div>
          <CartModal />
        </div>
      </div>
    </div>
  );
};
