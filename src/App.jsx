import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AddPost } from './pages/AddPost';
import { useDispatch, useSelector } from 'react-redux';
import { Login } from './pages/Login';
import NotFound from './pages/NotFound';
import OrderCompleted from './pages/OrderCompleted';
import MainLayout from './layouts/MainLayouts';
import { Registration } from './pages/Registration';
import { fetchAuthMe, selectIsAuth } from './redux/auth';
const Cart = React.lazy(() => import(/* webpackChunkName:"Cart" */ './pages/Cart'));
const FullItem = React.lazy(() => import(/* webpackChunkName:"FullItem" */ './pages/FullItem'));

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />

        <Route path="/addpost" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/order-completed" element={<OrderCompleted />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="/products/:id"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              <FullItem />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
