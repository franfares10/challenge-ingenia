import React, {
  useReducer,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { ICartItem } from '../interfaces/ICartItem';

type CartAction =
  | { type: 'ADD_ITEM'; payload: ICartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'INCREMENT_ITEM'; payload: number }
  | { type: 'DECREMENT_ITEM'; payload: number }
  | { type: 'SET_ITEMS'; payload: ICartItem[] };

interface CartState {
  items: ICartItem[];
}

const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREMENT_ITEM: 'INCREMENT_ITEM',
  DECREMENT_ITEM: 'DECREMENT_ITEM',
  SET_ITEMS: 'SET_ITEMS',
} as const;

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case ACTIONS.INCREMENT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case ACTIONS.DECREMENT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

const initialCartState: CartState = {
  items: [],
};

const initializeCartState = (): CartState => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? { items: JSON.parse(savedCart) } : initialCartState;
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialCartState, dispatch: () => null });

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, initializeCartState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: ACTIONS.SET_ITEMS, payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
