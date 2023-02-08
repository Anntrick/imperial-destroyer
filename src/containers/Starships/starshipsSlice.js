import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    error: ''
}

const starshipsSlice = createSlice({
    name: "starships",
    initialState,
    reducers: {
        addStarships(state, action) {
            return {
                ...state,
                items: action.payload
            }
        },
        markAsConquered(state, action) {
            const starshipIndex = state.items.findIndex(starship => starship.name === action.payload)
            if (starshipIndex !== -1) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        state.items[starshipIndex].conquered = true
                    ]
                }
            }

        },
        markAsDeleted(state, action) {
            const starshipIndex = state.items.findIndex(starship => starship.name === action.payload)
            if (starshipIndex !== -1) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        state.items[starshipIndex].deleted = true
                    ]
                }
            }
        },
        sortStarships(state, action) {
            const { field, direction } = action.payload;
            state.items.sort((a, b) => {
                return direction === 'asc' ? 1 : -1
               
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

export const { addStarships, markAsConquered, markAsDeleted, sortStarships, setError } = starshipsSlice.actions

export const starshipsData = (state) => state.starshipsSlice
export default starshipsSlice.reducer