import { userSlice, initialState, setIsAuthChecked, setUser } from './slice';
import { login, logout, register, update } from './actions';
import { TUser } from '../../utils/types';
import { TAuthResponse } from '../../utils/burger-api';

const user: TUser = {
  email: 'a',
  name: 'b'
};

const authResponse: TAuthResponse = {
  success: true,
  refreshToken: 'c',
  accessToken: 'd',
  user: user
};

describe('Проверка слайса userSlice', () => {
  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('setIsAuthChecked', () => {
    const action = { type: setIsAuthChecked.type, payload: true };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('setUser', () => {
    const action = { type: setUser.type, payload: user };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: user });
  });

  it('login fulfilled', () => {
    const action = { type: login.fulfilled.type, payload: authResponse };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: authResponse.user,
      isAuthChecked: true
    });
  });

  it('login rejected', () => {
    const errorMessage = 'Ошибка при входе в аккаунт';
    const action = {
      type: login.rejected.type,
      payload: errorMessage
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });

  it('logout fulfilled', () => {
    const prevState = { ...initialState, user: user };
    const action = { type: logout.fulfilled.type };
    const state = userSlice.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  it('logout rejected', () => {
    const prevState = { ...initialState, user: user, isAuthChecked: true };
    const errorMessage = 'Ошибка при выходе из аккаунта';
    const action = {
      type: logout.rejected.type,
      payload: errorMessage
    };
    const state = userSlice.reducer(prevState, action);
    expect(state).toEqual({ ...initialState, user: user, isAuthChecked: true });
  });

  it('register fulfilled', () => {
    const action = { type: register.fulfilled.type, payload: authResponse };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: authResponse.user,
      isAuthChecked: true
    });
  });

  it('register rejected', () => {
    const errorMessage = 'Ошибка при регистрации аккаунта';
    const action = {
      type: register.rejected.type,
      payload: errorMessage
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });

  it('update fulfilled', () => {
    const action = { type: update.fulfilled.type, payload: authResponse };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, user: authResponse.user });
  });

  it('update rejected', () => {
    const errorMessage = 'Ошибка при изменении данных аккаунта';
    const action = {
      type: update.rejected.type,
      payload: errorMessage
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
});
