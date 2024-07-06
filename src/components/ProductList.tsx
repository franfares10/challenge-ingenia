import { Link } from 'react-router-dom';
import { PriceLabel } from './PriceLabel';
import { IProduct } from '../interfaces/IProduct';

interface ProductListProps {
  items: IProduct[];
  handleAddToCart: (item: IProduct) => void;
}

export default function ProductList({
  items,
  handleAddToCart,
}: ProductListProps) {
  return (
    <article className='grid gap-4'>
      {items?.map(item => (
        <Link to={`/items/${item.id}`} key={item.id}>
          <div className='flex gap-6 items-center'>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='w-36 h-36 object-cover rounded-lg'
            />
            <div className='flex flex-col justify-between'>
              <PriceLabel price={item.price as number} currency={'USD'} />
              <p className='text-lg font-semibold text-gray-800'>
                {item.title}
              </p>
            </div>
            <span className='ml-auto text-sm opacity-70 font-medium'>
              {item.availabilityStatus.toLocaleUpperCase()}
            </span>
            <button
              className='ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 h-1/2'
              onClick={e => {
                e.preventDefault();
                handleAddToCart(item);
              }}
            >
              Añadir al Carrito
            </button>
          </div>
        </Link>
      ))}
    </article>
  );
}
