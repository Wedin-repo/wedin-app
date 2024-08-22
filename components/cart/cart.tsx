import { useCart } from '@/lib/context/cart-context';

const Cart = () => {
  const { state } = useCart();

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
