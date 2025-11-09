import {createAsyncThunk} from '@reduxjs/toolkit'
import {orderBurgerApi, getOrdersApi} from '../../utils/burger-api'
import { useSelector } from '../store'
import { selectOrderIngredients } from '../order/slice'

export const orderBurger = createAsyncThunk(
    'order/orderBurger',
    async (data: string[]) => {
        return orderBurgerApi(data)
    }
)

export const profileOrders = createAsyncThunk(
    'order/profileOrders',
    async () => {
        return getOrdersApi()
    }
)
