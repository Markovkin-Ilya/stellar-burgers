import { feedSlice, initialState } from './slice';
import { getFeed } from './actions';
import { TOrder } from '../../utils/types';

const orders: TOrder[] = [
  {
    createdAt: '2025-11-18T16:14:49.339Z',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    name: 'Space флюоресцентный бургер',
    number: 94584,
    status: 'done',
    updatedAt: '2025-11-18T16:14:49.539Z',
    _id: '691c9b79a64177001b31f4ab'
  },
  {
    createdAt: '2025-11-18T16:12:24.268Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa093d'
    ],
    name: 'Минеральный флюоресцентный бургер',
    number: 94583,
    status: 'done',
    updatedAt: '2025-11-18T16:12:24.467Z',
    _id: '691c9ae8a64177001b31f4a9'
  }
];

const feedState = {
  total: 1000,
  totalToday: 100,
  orders: orders
};

describe('Проверка слайса feedSlice', () => {
  it('initializes correctly', () => {
    const state = feedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('getFeed pending', () => {
    const prevState = {
      ...initialState,
      feeds: { total: feedState.total, totalToday: feedState.totalToday },
      orders: feedState.orders
    };
    const action = { type: getFeed.pending.type };
    const state = feedSlice.reducer(prevState, action);
    expect(state).toEqual({ ...initialState });
  });

  it('getFeed fulfilled', () => {
    const action = { type: getFeed.fulfilled.type, payload: feedState };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      feeds: { total: feedState.total, totalToday: feedState.totalToday },
      orders: feedState.orders
    });
  });

  it('getFeed rejected', () => {
    const errorMessage = 'Ошибка при загрузке заказов';
    const action = {
      type: getFeed.rejected.type,
      payload: errorMessage
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
});
