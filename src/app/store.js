import { configureStore } from '@reduxjs/toolkit'

import planetsSlice from '../containers/Planets/planetsSlice'

const store = configureStore({ 
    reducer: {
        planetsSlice 
    }
})


export default store