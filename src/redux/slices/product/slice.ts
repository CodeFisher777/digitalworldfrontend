import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { FetchProductArgs, ProductItem, ProductSliceState, Status } from './type';

export const fetchProduct = createAsyncThunk<ProductItem[], FetchProductArgs>(
  'product/fetchProductStatus',
  async (params) => {
    const { category } = params;

    const { data } = await axios.get<ProductItem[]>(`/products${category}`);

    return data;
  },
);

export const fetchRemoveProduct = createAsyncThunk<ProductItem[]>(
  'product/fetchRemoveProduct',
  async (id) => {
    const { data } = await axios.delete<ProductItem[]>(`/products/${id}`);

    return data;
  },
);

const initialState: ProductSliceState = {
  items: [],
  status: Status.LOADING,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ProductItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Получение списка продуктов
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      state.items = action.payload;
    });

    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    //Удаление продукта из списка
    builder.addCase(fetchRemoveProduct.pending, (state, action) => {
      //@ts-ignore
      state.items = state.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const { setItems } = productSlice.actions;
export default productSlice.reducer;
