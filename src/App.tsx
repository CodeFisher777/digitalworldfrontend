import './scss/app.scss';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullItem from './pages/FullItem';
import MainLayout from './layouts/MainLayouts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="items/:id" element={<FullItem />} />
      </Route>
    </Routes>
  );
}

export default App;
