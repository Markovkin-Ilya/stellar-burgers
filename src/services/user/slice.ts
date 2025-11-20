import { TUser } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, register, update } from './actions';
import { setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = false;
        console.log(action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthChecked = true;
        console.log(action.payload);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.user = null;
        console.log(action.payload);
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(update.rejected, (state, action) => {
        console.log(action.payload);
      });
  }
});

export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
export const { setIsAuthChecked, setUser } = userSlice.actions;
