import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import CartPage from './pages/Cart';
import HomePage from './pages/Home';
import Categories from './pages/Categories';

const Items = React.lazy(() => import('./pages/Items'));
const ItemDescription = React.lazy(() => import('./pages/ItemDescription'));

function App() {
  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/items' element={<Items />} />
            <Route path='items/:id' element={<ItemDescription />} />
            <Route path='/items/category/:slug' element={<Categories />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
