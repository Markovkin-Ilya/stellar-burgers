import {TIngredient, TOrder} from '../../utils/types'
import { TNewOrderResponse } from '../../utils/burger-api'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {orderBurger, profileOrders} from './actions'

type TOrderState = {
 orderIngredients: string[] ,
 orderRequest: boolean,
 orderModalData: TNewOrderResponse | null;
 profileOrders: TOrder[],
}

export const initialState: TOrderState = {
    orderIngredients: [],
    orderRequest: false,
    orderModalData: null,
    profileOrders:[]
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrederIngredients: (state, action: PayloadAction<{bun: TIngredient | null, ingredients: TIngredient[]}>) => {  
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
        selectprofileOrders: state => state.profileOrders,
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
          .addCase(profileOrders.fulfilled, (state, action) => {
            state.profileOrders = action.payload
          })
    }
})

export const { selectOrderIngredients, selectOrderRequest, selectOrderModalData, selectprofileOrders } = orderSlice.selectors;
export const {setOrederIngredients, deleteOrderState} = orderSlice.actions;
