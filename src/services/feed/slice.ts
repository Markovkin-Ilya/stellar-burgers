import { TOrder } from '../../utils/types'
import { createSlice } from '@reduxjs/toolkit'
import { getFeed } from './actions'

type TFeedsState = {
    feeds: { total: number, totalToday: number },
    orders: TOrder[],
}

export const initialState: TFeedsState = {
    feeds: { total: 0, totalToday: 0 },
    orders: [],
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    selectors: {
        selectFeeds: state => state.feeds,
        selectFeedOrders: state => state.orders
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeed.fulfilled, (state, action) => {
                state.feeds.total = action.payload.total;
                state.feeds.totalToday = action.payload.totalToday;
                state.orders = action.payload.orders
            })
            .addCase(getFeed.pending, (state) => {
                state.feeds = { total: 0, totalToday: 0 };
                state.orders = []
            })
    }
})

export const { selectFeeds, selectFeedOrders } = feedSlice.selectors;
