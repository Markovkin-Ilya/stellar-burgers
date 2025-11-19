import { constructorSlice, initialState, setIngredient, deleteIngredient, DownIngredient, UpIngredient, deleteConstructorItems } from './slice'
import { TIngredient } from '../../utils/types'

const ingredientBun: TIngredient = {
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
    _id: "643d69a5c3f7b9001cfa093c",
}

const ingredientMain: TIngredient = {
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
}

const ingredientForDelete = {
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
    _id: "643d69a5c3f7b9001cfa0941",
    id: "1"
}

const ingredients = [
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
        _id: "643d69a5c3f7b9001cfa0941",
        id: "1"
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
        _id: "643d69a5c3f7b9001cfa093e",
        id: "2"
    },
];

const ingredientsTo = [
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
        _id: "643d69a5c3f7b9001cfa093e",
        id: "2"
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
        _id: "643d69a5c3f7b9001cfa0941",
        id: "1"
    },
];



describe('Проверка слайса constructorSlice', () => {
    it('initializes correctly', () => {
        const state = constructorSlice.reducer(undefined, { type: '' })
        expect(state).toEqual(initialState)
    })

    it('setIngredient bun', () => {
        const action = { type: setIngredient.type, payload: { ...ingredientBun, id: "1" } }
        const state = constructorSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, constructorItems: { bun: { ...ingredientBun, id: "1" }, ingredients: [] } })
    })

    it('setIngredient main', () => {
        const action = { type: setIngredient.type, payload: { ...ingredientMain, id: "1" } }
        const state = constructorSlice.reducer(initialState, action);
        expect(state).toEqual({ ...initialState, constructorItems: { bun: null, ingredients: [{ ...ingredientMain, id: "1" }] } })
    })

    it('deleteIngredient', () => {
        const prevState = { ...initialState, constructorItems: { bun: null, ingredients: [ingredientForDelete] } }
        const action = { type: deleteIngredient.type, payload: 0 }
        const state = constructorSlice.reducer(prevState, action);
        expect(state).toEqual({ ...initialState })
    })

    it('DownIngredient', () => {
        const prevState = { ...initialState, constructorItems: { bun: null, ingredients: ingredients } }
        const action = { type: DownIngredient.type, payload: 0 }
        const state = constructorSlice.reducer(prevState, action);
        expect(state).toEqual({ ...initialState, constructorItems: { bun: null, ingredients: ingredientsTo } })
    })

    it('UpIngredient', () => {
        const prevState = { ...initialState, constructorItems: { bun: null, ingredients: ingredients } }
        const action = { type: UpIngredient.type, payload: 1 }
        const state = constructorSlice.reducer(prevState, action);
        expect(state).toEqual({ ...initialState, constructorItems: { bun: null, ingredients: ingredientsTo } })
    })

    it('deleteConstructorItems', () => {
        const prevState = { ...initialState, constructorItems: { bun: { ...ingredientBun, id: "3" }, ingredients: ingredients } }
        const action = { type: deleteConstructorItems.type }
        const state = constructorSlice.reducer(prevState, action);
        expect(state).toEqual(initialState)
    })

})