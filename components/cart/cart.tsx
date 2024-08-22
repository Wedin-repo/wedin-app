import { useCart } from '@/lib/context/cart-context';

const Cart = () => {
  const { state, dispatch } = useCart();
  const { items: cartItems } = state;

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <div>
          <button onClick={clearCart}>Clear Cart</button>
          {/* Add Checkout functionality here */}
        </div>
      )}
    </div>
  );
};

export default Cart;
