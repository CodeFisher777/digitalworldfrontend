import React from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayouts';
import { fetchAuthMe, selectIsAuth } from './redux/auth';

const Registration = React.lazy(() =>
  import(/* webpackChunkName:"Registration" */ './pages/Registration'),
);
const Orders = React.lazy(() => import(/* webpackChunkName:"Orders" */ './pages/Orders'));
const Login = React.lazy(() => import(/* webpackChunkName:"Login" */ './pages/Login'));
const OrderCompleted = React.lazy(() =>
  import(/* webpackChunkName:"OrderCompleted" */ './pages/OrderCompleted'),
);
const AddGame = React.lazy(() => import(/* webpackChunkName:"AddGame" */ './pages/AddGame'));
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
        <Route
          path="/orders"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              {' '}
              <Orders />{' '}
            </React.Suspense>
          }
        />
        <Route
          path="/addgame"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              {' '}
              <AddGame />{' '}
            </React.Suspense>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              {' '}
              <AddGame />{' '}
            </React.Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              {' '}
              <Login />{' '}
            </React.Suspense>
          }
        />
        <Route
          path="/registration"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              {' '}
              <Registration />{' '}
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/order-completed"
          element={
            <React.Suspense fallback={<div>Загрузка</div>}>
              {' '}
              <OrderCompleted />{' '}
            </React.Suspense>
          }
        />
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
