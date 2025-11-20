import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/slice';
import { constructorSlice } from './constructor/slice';
import { orderSlice } from './order/slice';
import { feedSlice } from './feed/slice';
import { userSlice } from './user/slice';
import { profileOrdersSlice } from './profile-orders/slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  profileOrdersSlice,
  userSlice,
  feedSlice,
  ingredientsSlice,
  constructorSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
