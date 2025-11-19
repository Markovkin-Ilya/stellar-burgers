import { TIngredient } from '../../utils/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';


type TConstructorIngredientsState = {
    constructorItems: { bun: TConstructorIngredient | null, ingredients: TConstructorIngredient[] }
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
        setIngredient: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                if (action.payload.type === 'bun') {
                    state.constructorItems.bun = action.payload
                }
                else {
                    state.constructorItems.ingredients.push(action.payload);
                }
            },
            prepare: (ingredient: TIngredient) => {
                return { payload: { ...ingredient, id: uuidv4() } };
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

export const { selectConstructorItems } = constructorSlice.selectors;
export const { setIngredient, deleteIngredient, DownIngredient, UpIngredient, deleteConstructorItems } = constructorSlice.actions;

export default constructorSlice.reducer; 