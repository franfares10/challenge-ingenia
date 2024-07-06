import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className='flex justify-center items-center h-full' role='progressbar'>
      <div className='animate-spin rounded-full size-16 border-b-2 border-yellow-600'></div>
    </div>
  );
};
