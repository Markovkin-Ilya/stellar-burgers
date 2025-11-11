import { TOrder } from '../../utils/types'
import { createSlice } from '@reduxjs/toolkit'
import { getOrders } from './actions'

type TProfileOrdersState = {
    orders: TOrder[],
}

export const initialState: TProfileOrdersState = {
    orders: [],
}

export const profileOrdersSlice = createSlice({
    name: 'profileOrders',
    initialState,
    reducers: {},
    selectors: {
        selectProfileOrders: state => state.orders
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            .addCase(getOrders.pending, (state) => {
                state.orders = []
            })
    }
})

export const { selectProfileOrders } = profileOrdersSlice.selectors;
