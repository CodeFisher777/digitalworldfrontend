import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/slice';
import cart from './slices/cart/slice';
import product from './slices/product/slice';
import { useDispatch } from 'react-redux';
import { authReducer } from './auth';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    product,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
