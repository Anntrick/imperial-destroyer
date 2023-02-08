import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    error: ''
}

const planetsSlice = createSlice({
    name: "planets",
    initialState,
    reducers: {
        addPlanets(state, action) {
            return {
                ...state,
                items: action.payload
            }
        },
        markAsConquered(state, action) {
            const planetIndex = state.items.findIndex(planet => planet.name === action.payload)
            if (planetIndex !== -1) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        state.items[planetIndex].conquered = true
                    ]
                }
            }

        },
        markAsDeleted(state, action) {
            const planetIndex = state.items.findIndex(planet => planet.name === action.payload)
            if (planetIndex !== -1) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        state.items[planetIndex].deleted = true
                    ]
                }
            }
        },
        sortPlanets(state, action) {
            const { field, direction } = action.payload;
            state.items.sort((a, b) => {
                if (a[field] < b[field])
                    return -1
                if (a[field] > b[field])
                    return 1
                return 
            })
        },
        setError(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
    },
})

export const { addPlanets, markAsConquered, markAsDeleted, sortPlanets, setError } = planetsSlice.actions

export const planetsData = (state) => state.planetsSlice
export default planetsSlice.reducer