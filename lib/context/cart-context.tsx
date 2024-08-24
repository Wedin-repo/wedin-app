'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  useMemo,
} from 'react';

type CartItem = {
  id: string;
  amountToGift: number;
  gift: {
    name: string;
  };
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

// Action creators
const addItem = (item: CartItem): CartAction => ({ type: 'ADD_ITEM', item });
const removeItem = (id: string): CartAction => ({ type: 'REMOVE_ITEM', id });
const clearCart = (): CartAction => ({ type: 'CLEAR_CART' });

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  const { state, dispatch } = context;

  return {
    state,
    addItem: (item: CartItem) => dispatch(addItem(item)),
    removeItem: (id: string) => dispatch(removeItem(id)),
    clearCart: () => dispatch(clearCart()),
  };
};
