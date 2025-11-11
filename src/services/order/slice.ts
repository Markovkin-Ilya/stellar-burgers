import { TIngredient, TOrder } from '../../utils/types'
import { TNewOrderResponse } from '../../utils/burger-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { orderBurger } from './actions'

type TOrderState = {
    orderIngredients: string[],
    orderRequest: boolean,
    orderModalData: TNewOrderResponse | null;
}

export const initialState: TOrderState = {
    orderIngredients: [],
    orderRequest: false,
    orderModalData: null,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrederIngredients: (state, action: PayloadAction<{ bun: TIngredient | null, ingredients: TIngredient[] }>) => {
            if (action.payload.bun) {
                state.orderIngredients = action.payload.ingredients.map(ingredient => ingredient._id);
                state.orderIngredients.unshift(action.payload.bun._id)
                state.orderIngredients.push(action.payload.bun._id)
            }
        },
        deleteOrderState: (state) => {
            state.orderModalData = null;
            state.orderIngredients = [];
            state.orderRequest = false
        }
    },
    selectors: {
        selectOrderIngredients: state => state.orderIngredients,
        selectOrderRequest: state => state.orderRequest,
        selectOrderModalData: state => state.orderModalData,
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderBurger.pending, (state) => {
                state.orderRequest = true;
            })
            .addCase(orderBurger.fulfilled, (state, action) => {
                state.orderRequest = false;
                state.orderModalData = action.payload
            })
    }
})

export const { selectOrderIngredients, selectOrderRequest, selectOrderModalData } = orderSlice.selectors;
export const { setOrederIngredients, deleteOrderState } = orderSlice.actions;
