import { profileOrdersSlice, initialState } from './slice';
import { getOrders } from './actions';
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

describe('Проверка слайса profileOrdersSlice', () => {
  it('initializes correctly', () => {
    const state = profileOrdersSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('getOrders pending', () => {
    const prevState = { ...initialState, orders: orders };
    const action = { type: getOrders.pending.type };
    const state = profileOrdersSlice.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  it('getOrders fulfilled', () => {
    const action = { type: getOrders.fulfilled.type, payload: orders };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orders: orders });
  });

  it('getOrders rejected', () => {
    const errorMessage = 'Ошибка при заказе бургера';
    const action = {
      type: getOrders.rejected.type,
      payload: errorMessage
    };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
});
