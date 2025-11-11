import { TIngredient } from '../../utils/types'
import { createSlice } from '@reduxjs/toolkit'
import { getIngredients } from './actions'

type TIngredientsState = {
    ingredients: TIngredient[],
    isIngredientsLoading: boolean
}

export const initialState: TIngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    selectors: {
        selectIngredients: state => state.ingredients,
        selectIsIngredientsLoading: state => state.isIngredientsLoading,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.isIngredientsLoading = true;
            })
    }
})

export const { selectIngredients, selectIsIngredientsLoading } = ingredientsSlice.selectors;
