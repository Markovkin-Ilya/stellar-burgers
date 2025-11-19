import { ingredientsSlice, initialState } from './slice'
import { getIngredients } from './actions'
import { expect, it } from '@jest/globals';
import { TIngredient } from '../../utils/types'

const ingredients: TIngredient[] = [
    {
        calories: 420,
        carbohydrates: 53,
        fat: 24,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        name: "Краторная булка N-200i",
        price: 1255,
        proteins: 80,
        type: "bun",
        _id: "643d69a5c3f7b9001cfa093c"
    },
    {
        calories: 4242,
        carbohydrates: 242,
        fat: 142,
        image: "https://code.s3.yandex.net/react/code/meat-01.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        name: "Биокотлета из марсианской Магнолии",
        price: 424,
        proteins: 420,
        type: "main",
        _id: "643d69a5c3f7b9001cfa0941"
    },
    {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        name: "Филе Люминесцентного тетраодонтимформа",
        price: 988,
        proteins: 44,
        type: "main",
        _id: "643d69a5c3f7b9001cfa093e"
    },
]

describe('Проверка слайса ingredientsSlice', () => {
    it('initializes correctly', () => {
        const state = ingredientsSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    })

    it('getIngredients fulfilled', () => {
        const action = { type: getIngredients.fulfilled.type, payload: ingredients };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, ingredients: ingredients, isIngredientsLoading: true });
    })
})