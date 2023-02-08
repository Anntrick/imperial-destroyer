import { configureStore } from '@reduxjs/toolkit'

import planetsSlice from '../containers/Planets/planetsSlice'
import starshipsSlice from '../containers/Starships/starshipsSlice'

export const store = configureStore({ 
    reducer: {
        planetsSlice,
        starshipsSlice
    }
})

