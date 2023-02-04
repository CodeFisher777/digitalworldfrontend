import React from 'react';
import logo from '../assets/img/logo.png';
import lk from '../assets/img/lk.png';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from '../redux/slices/cart/selectors';

import {
  fetchAuth,
  logout,
  selectFullName,
  selectIsAuth,
  selectMaster,
  setMaster,
} from '../redux/auth';
import { clearItems } from '../redux/slices/cart/slice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectFullName);
  const isMaster = useSelector(selectMaster);

  const { items, totalPrice } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = React.useRef(false);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickLogout = () => {
    if (window.confirm('Are you sure want to logout?')) {
      dispatch(logout());
      dispatch(clearItems());
      dispatch(setMaster(false));
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('cart');

      navigate('/');
      // window.location.reload();
    }
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);

      window.localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="60" height="40" src={logo} alt="Pizza logo" />

            <div>
              <h1>Digital world</h1>
              <p>Магазин цифровой техники</p>
            </div>
          </div>
        </Link>

        {location.pathname !== '/registration' &&
          location.pathname !== '/cart' &&
          location.pathname !== '/login' && <Search />}
        <div className="header__cart">
          {location.pathname !== '/registration' &&
            location.pathname !== '/cart' &&
            location.pathname !== '/login' && (
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice} ₽</span>
                <div className="button__delimiter"></div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>{totalCount}</span>
              </Link>
            )}
        </div>
        {isAuth ? (
          <>
            {isMaster ? (
              <>
                <Link to="/orders">
                  <button className="button button--cart">Заказы</button>
                </Link>
                <Link to="/addgame">
                  <button className="button button--cart">добавить товар</button>
                </Link>
              </>
            ) : (
              <></>
            )}
            <button className="button button--cart" onClick={onClickLogout}>
              Выйти
            </button>
            <p className="user-name">{userData.fullName}</p>
          </>
        ) : (
          <>
            {location.pathname !== '/registration' && location.pathname !== '/login' && (
              <Link to="/login">
                <button className="button button--cart">
                  <img className="lk" src={lk} />
                </button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
