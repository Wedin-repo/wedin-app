'use client';

import { useCart } from '@/lib/context/cart-context';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';

export const Cart = () => {
  const { state, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return null;
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart-items fixed bottom-0 left-0 right-0 bg-primaryBackgroundColor p-4 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      <ul className="space-y-4">
        {state.items.map(item => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {formatPrice(Number(item.price))} x {item.quantity}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button variant="destructive" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
