import React, { useState } from 'react';
import { IoMdSearch, IoMdCart } from 'react-icons/io';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCart } from '../providers/CartContext';
import logo from '../assets/logo.jpg';

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('search') || ''
  );
  const { state } = useCart();

  const handleGoHome = () => {
    navigate('/');
    setSearchQuery('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
    navigate(`/items?search=${searchQuery}`);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <form
      className='m-auto flex items-center max-w-screen-lg flex-1 gap-4'
      onSubmit={handleSubmit}
      role='form'
    >
      <img
        className='size-10 cursor-pointer'
        src={logo}
        alt='logo'
        onClick={handleGoHome}
        role='img'
      />
      <input
        className='h-8 flex-1 rounded-md'
        type='text'
        value={searchQuery}
        role='searchbox'
        onChange={handleInputChange}
      />
      <button className='h-8 w-8 px-2 py-1 text-slate-700' type='submit'>
        <IoMdSearch />
      </button>
      <div className='relative cursor-pointer' onClick={handleGoToCart}>
        <IoMdCart className='size-8 text-slate-700' />
        {state.items.length > 0 && (
          <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>
            {state.items.length}
          </span>
        )}
      </div>
    </form>
  );
}
