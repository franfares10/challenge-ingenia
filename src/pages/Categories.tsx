import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { IProduct } from '../interfaces/IProduct';
import { useFetch } from '../hooks/useFetch';
import { Loader } from '../components/Loader';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useCart } from '../providers/CartContext';
import { SelectChangeEvent } from '@mui/material';
import ProductList from '../components/ProductList';
import PaginationTab from '../components/PaginationTab';

export default function Items() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<IProduct[]>([]);
  const defaultPage = '1';
  const defaultLimit = '8';
  const page = parseInt(searchParams.get('page') || defaultPage, 10);
  const pageSize = parseInt(searchParams.get('limit') || defaultLimit, 10);
  const skip = (page - 1) * pageSize;
  const {
    data: products,
    loading,
    error,
  } = useFetch<{
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
  }>(`/products/category/${slug}?page=${page}&skip=${skip}&limit=${pageSize}`);

  const totalItems = products?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const { dispatch } = useCart();

  useEffect(() => {
    if (!searchParams.has('page') || !searchParams.has('limit')) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        page: searchParams.get('page') || defaultPage,
        limit: searchParams.get('limit') || defaultLimit,
      });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (products) {
      setItems(products.products);
    }
  }, [products]);

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: value.toString(),
      limit: pageSize.toString(),
    });
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: '1',
      limit: (event.target.value as number).toString(),
    });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Productos</title>
        <meta name='description' content='Productos' />
        <meta name='keywords' content='Productos' />
        <meta charSet='utf-8' />
      </Helmet>
      <section className='flex flex-col gap-8'>
        {loading && <Loader />}
        {error && <p>Hubo un error</p>}
        <ProductList items={items} handleAddToCart={handleAddToCart} />
        <PaginationTab
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          handleLimitChange={handleLimitChange}
          handlePageChange={handlePageChange}
        />
      </section>
    </React.Fragment>
  );
}
