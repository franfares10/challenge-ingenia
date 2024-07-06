import { useParams } from 'react-router-dom';
import { PriceLabel } from '../components/PriceLabel';
import { useFetch } from '../hooks/useFetch';
import { IProduct } from '../interfaces/IProduct';
import { Loader } from '../components/Loader';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useCart } from '../providers/CartContext';

type Params = {
  id: string;
};

const ProductDescription: React.FC = () => {
  const { id } = useParams<Params>();
  const {
    data: product,
    loading,
    error,
  } = useFetch<IProduct>(`/products/${id}`);
  const { dispatch } = useCart();

  const handleAddToCart = (item: IProduct) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: 1,
      },
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Descripción del producto</title>
        <meta name='description' content='Producto' />
        <meta name='keywords' content='Producto' />
        <meta charSet='utf-8' />
      </Helmet>
      <section role='main'>
        {loading && <Loader />}
        {error && <p>Hubo un error</p>}
        {product && (
          <React.Fragment>
            <article className='grid gap-4'>
              <div className='flex justify-around items-center'>
                <img src={product?.thumbnail} alt='product' />
                <button
                  className='ml-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300 h-1/4'
                  onClick={e => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                >
                  Añadir al Carrito
                </button>
              </div>
              <div className='flex flex-col'>
                <div>
                  <span className='ml-auto text-sm opacity-50 font-semibold'>
                    {product?.rating}
                  </span>
                  <PriceLabel
                    price={product?.price as number}
                    currency={'USD'}
                  />
                  <p>{product?.title}</p>
                </div>
              </div>
            </article>
            <article>
              <p>Descripción del producto</p>
              <p>{product?.description}</p>
            </article>
          </React.Fragment>
        )}
      </section>
    </React.Fragment>
  );
};

export default ProductDescription;
