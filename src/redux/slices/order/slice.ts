import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderSliceState } from './types';

const initialState: OrderSliceState = {
  orderNumber: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderNumber(state, action: PayloadAction<number>) {
      state.orderNumber = action.payload;
    },
  },
});
export const { setOrderNumber } = orderSlice.actions;
export default orderSlice.reducer;
