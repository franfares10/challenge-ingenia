import React from 'react';
import { useCart } from '../providers/CartContext';
import { useNavigate } from 'react-router-dom';
import { ICartItem } from '../interfaces/ICartItem';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  const incrementItem = (id: number) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: id });
  };

  const decrementItem = (id: number) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: id });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const calculateTotal = (): string => {
    return state.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Carrito de Compras</h1>
      {state.items.length === 0 ? (
        <p>No hay artículos en el carrito.</p>
      ) : (
        <>
          {state.items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
              removeItem={removeItem}
            />
          ))}
          <div className='mt-4'>
            <p className='text-xl font-semibold'>Total: ${calculateTotal()}</p>
          </div>
        </>
      )}
    </div>
  );
};

interface CartItemProps {
  item: ICartItem;
  incrementItem: (id: number) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  incrementItem,
  decrementItem,
  removeItem,
}) => {
  return (
    <div className='flex items-center justify-between border-b py-2'>
      <div>
        <p className='text-lg'>{item.name}</p>
        <p className='text-gray-500'>
          ${item.price} x {item.quantity}
        </p>
      </div>
      <div className='flex items-center'>
        <button
          className='text-gray-500 hover:text-gray-700'
          onClick={() => decrementItem(item.id)}
        >
          -
        </button>
        <span className='mx-2'>{item.quantity}</span>
        <button
          className='text-gray-500 hover:text-gray-700'
          onClick={() => incrementItem(item.id)}
        >
          +
        </button>
        <button
          className='ml-4 text-red-500 hover:text-red-700'
          onClick={() => removeItem(item.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Cart;
