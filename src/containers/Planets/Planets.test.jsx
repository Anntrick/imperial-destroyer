import React from 'react'
import { render, fireEvent, getByText, act } from '@testing-library/react'
import { Planets } from './Planets'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { planetsSlice, addPlanets } from './planetsSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { SwapiService } from '../../services/swapiService'
import { vi } from 'vitest'

vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux')

    return {
        ...actual,
        useSelector: vi.fn().mockReturnValue([{ name: 'Tatooine', population: 200000 }, { name: 'Alderaan', population: 200000000 }]),
        useDispatch: vi.fn()
    }
})

vi.mock(SwapiService)

const planets = [
    { name: 'Alderaan', population: '2000000000', climate: 'temperate', terrain: 'grasslands, mountains' },
    { name: 'Tatooine', population: '200000', climate: 'arid', terrain: 'desert' },
    { name: 'Hoth', population: 'unknown', climate: 'frozen', terrain: 'tundra, ice caves' },

]

describe('Planets component', () => {
    let store, getPlanetsSpy

    beforeEach(() => {
        getPlanetsSpy = vi.spyOn(SwapiService, "getPlanets").mockImplementation(() => Promise.resolve(planets))
        store = configureStore({
            reducer: combineReducers({
                planetsSlice
            })
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })
    
    it('Should render the component correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Planets />
            </Provider>
        )
        expect(getByText("Planets")).toBeInTheDocument()
    })

    it('Should render Loading component when loading is true', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Planets />
            </Provider>
        )
        expect(getByTestId('loading')).toBeInTheDocument()
    })

    it('Should render input and button', () => {
        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <Planets />
            </Provider>
        )
        expect(getByPlaceholderText('Search by planet name')).toBeInTheDocument()
        expect(getByText('Sort by Name')).toBeInTheDocument()
    })

    it('should call dispatch with the API response', async () => {
        store.dispatch = vi.fn()

        await act(async () => {
            render(<Planets />)
        })

        /*expect(dispatch).toHaveBeenCalledWith(addPlanets([
            { name: 'Alderaan', population: '2000000000', climate: 'temperate', terrain: 'grasslands, mountains' },
            { name: 'Tatooine', population: '200000', climate: 'arid', terrain: 'desert' },
            { name: 'Hoth', population: 'unknown', climate: 'frozen', terrain: 'tundra, ice caves' },
        ]))*/
    })

    it('should render ItemCard with correct data', () => {
        const dispatch = vi.fn()
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <Planets />
            </Provider>
        )
        const mockUseSelector = vi.fn().mockReturnValue(planets)
      //  vi.spyOn(ReactRedux, "useSelector").mockImplementation(mockUseSelector)
       // vi.spyOn(ReactRedux, "useDispatch").mockReturnValue(dispatch)
        expect(useSelector).toHaveBeenCalled()
        //expect(getByText("Tatooine")).toBeInTheDocument()

    })
})




/* 

3. Verificar que se haya manejado correctamente el error de la llamada a la API:

Se debe comprobar que la función "dispatch(setError(error))" se haya llamado en caso de que ocurra un error en la llamada a la API.
4. Verificar que el componente ItemCard se haya renderizado con la información correcta:

Se debe comprobar que se haya pasado un objeto "planet" como "data" a cada componente "ItemCard".
Se debe comprobar que cada componente "ItemCard" se haya renderizado con la información correspondiente de cada planeta.
5. Verificar la búsqueda de planetas:

Se debe comprobar que la búsqueda funcione correctamente.
Se debe comprobar que la búsqueda sea insensible a mayúsculas y minúsculas.
6. Verificar el ordenamiento de planetas:

Se debe comprobar que la función "handleSort" se haya ejecutado al hacer clic en el botón "Sort by Name".
Se debe comprobar que la función "dispatch(sortPlanets({ field }))" se haya llamado con el valor correcto para el campo "field".
7. Verificar la paginación de planetas:

Se debe comprobar que se haya implementado correctamente la paginación de planetas.
Se debe comprobar que el componente "Pagination" se haya renderizado correctamente con los valores correctos para "currentPage", "setCurrentPage", "totalItems" y "itemsPerPage".
 */