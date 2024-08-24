'use client';

import { useCart } from '@/lib/context/cart-context';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { FaRegTrashAlt } from 'react-icons/fa';

export const Cart = () => {
  const { state, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return null;
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  // const handleClearCart = () => {
  //   clearCart();
  // };

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
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="primaryButton"
                  className="bg-white text-primaryTextColor"
                >
                  Ir al carrito
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-w-lg">
                <div className="text-2xl font-semibold text-primaryTextColor">
                  Tu carrito
                </div>
                <div className="flex flex-col gap-4">
                  {state.items.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-300 pb-4"
                    >
                      <div>
                        <p>{item.gift.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p>{formatPrice(item.amountToGift)}</p>
                        <Button
                          variant="deleteGiftIconButton"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaRegTrashAlt fontSize={'16px'} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium">Total</p>
                  <p className="text-lg font-medium">
                    {formatPrice(
                      state.items.reduce(
                        (total, item) => total + item.amountToGift,
                        0
                      )
                    )}
                  </p>
                </div>
                <Button variant="primaryButton">Ir a pagar</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
