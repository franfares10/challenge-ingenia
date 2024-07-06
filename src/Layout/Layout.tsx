import { Outlet } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export default function Layout() {
  return (
    <div>
      <header className='flex h-16 bg-yellow-300 px-4'>
        <SearchBar />
      </header>
      <main className='max-w-screen-lg p-4 m-auto'>
        <Outlet />
      </main>
    </div>
  );
}
