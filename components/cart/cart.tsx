'use client';

import { useCart } from '@/lib/context/cart-context';
import { Button } from '@/components/ui/button';

export const Cart = () => {
  const { state, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="cart-items relative">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      <ul className="space-y-4">
        {state.items.map(item => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.price} x {item.quantity}
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
