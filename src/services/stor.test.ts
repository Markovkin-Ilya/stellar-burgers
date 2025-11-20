import { profileOrdersSlice } from './profile-orders/slice';
import { userSlice } from './user/slice';
import { constructorSlice } from './constructor/slice';
import { feedSlice } from './feed/slice';
import { ingredientsSlice } from './ingredients/slice';
import { orderSlice } from './order/slice';
import store from './store';

describe('Проверка слайса userSlice', () => {
  it('rootReducer', () => {
    const userState = userSlice.reducer(undefined, { type: '' });
    const profileOrdersState = profileOrdersSlice.reducer(undefined, {
      type: ''
    });
    const constructorState = constructorSlice.reducer(undefined, { type: '' });
    const feedState = feedSlice.reducer(undefined, { type: '' });
    const ingredientState = ingredientsSlice.reducer(undefined, { type: '' });
    const orderState = orderSlice.reducer(undefined, { type: '' });
    const initialState = {
      user: userState,
      profileOrders: profileOrdersState,
      constructorBurger: constructorState,
      feed: feedState,
      ingredients: ingredientState,
      order: orderState
    };
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});
