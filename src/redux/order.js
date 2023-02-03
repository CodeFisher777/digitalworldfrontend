import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  orderNumber: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
    },
  },
});
export const selectOrder = (state) => state.order.orderNumber;
export const { setOrderNumber } = orderSlice.actions;
export default orderSlice.reducer;
