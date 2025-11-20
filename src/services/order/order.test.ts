import {
  orderSlice,
  initialState,
  setOrederIngredients,
  deleteOrderState
} from './slice';
import { orderBurger } from './actions';
import { TNewOrderResponse } from '../../utils/burger-api';

const order = {
  bun: {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    _id: '643d69a5c3f7b9001cfa093c'
  },
  ingredients: [
    {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      name: 'Биокотлета из марсианской Магнолии',
      price: 424,
      proteins: 420,
      type: 'main',
      _id: '643d69a5c3f7b9001cfa0941'
    },
    {
      calories: 643,
      carbohydrates: 85,
      fat: 26,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      name: 'Филе Люминесцентного тетраодонтимформа',
      price: 988,
      proteins: 44,
      type: 'main',
      _id: '643d69a5c3f7b9001cfa093e'
    }
  ]
};

const orderId = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa093e',
  '643d69a5c3f7b9001cfa093c'
];

const orderModalData: TNewOrderResponse = {
  success: true,
  order: {
    _id: '1',
    status: 'a',
    name: 'b',
    createdAt: 'c',
    updatedAt: 'd',
    number: 1,
    ingredients: orderId
  },
  name: 'e'
};

describe('Проверка слайса orderSlice', () => {
  it('initializes correctly', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('setOrederIngredients', () => {
    const action = { type: setOrederIngredients.type, payload: order };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderIngredients: orderId });
  });

  it('deleteOrderState', () => {
    const prevState = {
      ...initialState,
      orderModalData: orderModalData,
      orderRequest: true,
      orderIngredients: orderId
    };
    const action = { type: deleteOrderState.type, payload: order };
    const state = orderSlice.reducer(prevState, action);
    expect(state).toEqual({ ...initialState });
  });

  it('orderBurger pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });

  it('orderBurger fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: orderModalData
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: orderModalData
    });
  });

  it('orderBurger rejected', () => {
    const errorMessage = 'Ошибка при заказе бургера';
    const action = {
      type: orderBurger.rejected.type,
      payload: errorMessage
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
});
