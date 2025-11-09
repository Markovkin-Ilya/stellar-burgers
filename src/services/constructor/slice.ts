import {TIngredient} from '../../utils/types'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { TConstructorIngredient } from '@utils-types';


type TConstructorIngredientsState = {
 constructorItems: {bun: TIngredient | null, ingredients: TIngredient[]}
}

export const initialState: TConstructorIngredientsState = {
    constructorItems: {
        bun: null,
        ingredients: []
    }
}

export const constructorSlice = createSlice({
    name: 'constructorBurger',
    initialState,
    reducers: {
        setIngredient: (state, action: PayloadAction<TIngredient>) => {  
            if (action.payload.type === 'bun') {
                state.constructorItems.bun = action.payload
            }
            else {
                state.constructorItems.ingredients.push(action.payload);
            }
        },
        deleteIngredient: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.constructorItems.ingredients.splice(index, 1)
        },
        DownIngredient: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            [state.constructorItems.ingredients[index], state.constructorItems.ingredients[index + 1]] = [state.constructorItems.ingredients[index + 1], state.constructorItems.ingredients[index]];
        },
        UpIngredient: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            [state.constructorItems.ingredients[index], state.constructorItems.ingredients[index - 1]] = [state.constructorItems.ingredients[index - 1], state.constructorItems.ingredients[index]];
        },
        deleteConstructorItems: (state) => {
            state.constructorItems = {
                bun: null,
                ingredients: []
            }
        }
    },
    selectors: {
        selectConstructorItems: state => state.constructorItems,
    },
})

export const {selectConstructorItems} = constructorSlice.selectors;
export const {setIngredient, deleteIngredient, DownIngredient, UpIngredient, deleteConstructorItems} = constructorSlice.actions;
