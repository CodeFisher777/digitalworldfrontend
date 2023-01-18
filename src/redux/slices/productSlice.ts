import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type FetchProductArgs = {
  sortBy: String;
  order: String;
  category: String;
  search: String;
  currentPage: String;
};

export type ProductItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
};

enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

interface ProductSliceState {
  items: ProductItem[];
  status: Status;
}

export const fetchProduct = createAsyncThunk<ProductItem[], FetchProductArgs>(
  'product/fetchProductStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<ProductItem[]>(
      `https://63ba93254482143a3f2ab5bc.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );

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
  },
  // extraReducers: {
  //   [fetchProduct.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchProduct.fulfilled]: (state, action) => {
  //     state.status = 'succes';
  //     state.items = action.payload;
  //   },
  //   [fetchProduct.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectProduct = (state: RootState) => state.product;
export const { setItems } = productSlice.actions;
export default productSlice.reducer;
