import { Link } from 'react-router-dom';
import { PriceLabel } from './PriceLabel';
import { IProduct } from '../interfaces/IProduct';
import { Button } from '@mui/material';

interface ProductListProps {
  items: IProduct[];
  handleAddToCart: (item: IProduct) => void;
}

export default function ProductList({
  items,
  handleAddToCart,
}: ProductListProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {items?.map(item => (
        <Link to={`/items/${item.id}`} key={item.id}>
          <div className='flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden shadow-md'>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='w-full h-36 object-cover rounded-t-lg'
            />
            <div className='p-4 flex flex-col justify-between flex-1'>
              <div className='py-2'>
                <PriceLabel price={item.price as number} currency={'USD'} />
                <p className='text-lg font-semibold text-gray-800 mt-2 mb-4'>
                  {item.title}
                </p>
                <span className='text-sm opacity-70 font-medium'>
                  {item.availabilityStatus.toLocaleUpperCase()}
                </span>
              </div>
              <Button
                variant='contained'
                className='mt-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300'
                disabled={item.stock < 1}
                onClick={e => {
                  e.preventDefault();
                  handleAddToCart(item);
                }}
              >
                Añadir al Carrito
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
