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
            state.items = action.payload
        },
        markAsConquered(state, action) {
            const planetIndex = state.items.findIndex(planet => planet.name === action.payload)
            if (planetIndex !== -1) {
                state.items[planetIndex].conquered = true
            }
        },
        markAsDeleted(state, action) {
            const planetIndex = state.items.findIndex(planet => planet.name === action.payload)
            if (planetIndex !== -1) {
                state.items[planetIndex].deleted = true
            }
        },
        sortPlanets(state, action) {
            const { field, direction } = action.payload;
            state.items.sort((a, b) => {
                if (a[field] < b[field]) return direction === 'asc' ? -1 : 1
                if (a[field] > b[field]) return direction === 'asc' ? 1 : -1
                return 0
            })
        },
        setError(state, action) {
            state.error = action.payload
        },
    },
})

export const { addPlanets, markAsConquered, markAsDeleted, sortPlanets, setError } = planetsSlice.actions
export const planetsSelector = (state) => state.items
export default planetsSlice.reducer