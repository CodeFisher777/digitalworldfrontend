import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from './axios';
import { RootState } from './store';

export interface AuthSliceState {
  data: any;
  status: string;
  master: boolean;
}
type FetchAuthArgs = {
  email: string;
  password: string;
};
type FetchRegisterArgs = {
  fullName: string;
  email: string;
  password: string;
};
type FetchAuthMe = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const fetchAuth = createAsyncThunk<Object, FetchAuthArgs>(
  'auth/fetchAuth',
  async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
  },
);

export const fetchRegister = createAsyncThunk<Object, FetchRegisterArgs>(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
  },
);
export const fetchAuthMe = createAsyncThunk<FetchAuthMe>('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});

const initialState: AuthSliceState = {
  data: null,
  status: 'loading',
  master: false,
};

const authSlice = createSlice({
  name: 'autn',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    setMaster(state, action) {
      state.master = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });

    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });

    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = 'loading';
      state.data = null;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = 'error';
      state.data = null;
    });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);
export const selectFullName = (state: RootState) => state.auth.data;
export const selectMaster = (state: RootState) => state.auth.master;
export const authReducer = authSlice.reducer;
export const { logout, setMaster } = authSlice.actions;
