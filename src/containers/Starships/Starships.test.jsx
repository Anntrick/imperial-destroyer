import React from 'react'
import { render, fireEvent, getByText, act } from '@testing-library/react'
import { Starships } from './Starships'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { starshipsSlice, addStarships, starshipsData } from './starshipsSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { SwapiService } from '../../services/swapiService'
import { vi } from 'vitest'

vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux')

    return {
        ...actual,
        useSelector: vi.fn(),
        useDispatch: vi.fn()
    }
})

vi.mock(SwapiService)

const starships = [
    { name: "Millennium Falcon", crew: 5, cargo_capacity: 100000 },
    { name: "X-wing", crew: 1, cargo_capacity: 40 },
    { name: "TIE fighter", crew: 1, cargo_capacity: 0 },
    { name: "Death Star", crew: 10000, cargo_capacity: 100000000 },
    { name: "Imperial shuttle", crew: 6, cargo_capacity: 80000 },
    { name: "Star Destroyer", crew: 37800, cargo_capacity: 1000000000 },
]

describe("Starships component", () => {
    let store, getStarshipsSpy

    beforeEach(() => {
        getStarshipsSpy = vi.spyOn(SwapiService, "getStarships").mockImplementation(() => Promise.resolve(starships))
        store = configureStore({
            reducer: combineReducers({
                starshipsSlice
            })
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('Should render the component correctly', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Starships />
            </Provider>
        )
        expect(getByText("Starships")).toBeInTheDocument()
    })

    it('Should render Loading component when loading is true', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <Starships />
            </Provider>
        )
        expect(getByTestId('loading')).toBeInTheDocument()
    })

    it('Should render input and button', () => {
        const { getByPlaceholderText, getByText } = render(
            <Provider store={store}>
                <Starships />
            </Provider>
        )
        expect(getByPlaceholderText('Search by starship name')).toBeInTheDocument()
        expect(getByText('Sort by crew')).toBeInTheDocument()
        expect(getByText('Sort by cargo capacity')).toBeInTheDocument()
    })

    it('should call dispatch with the API response', async () => {
        const dispatch = vi.fn()

        await act(async () => { render(
            <Provider store={store}>
                <Starships />
            </Provider>)
        })

        //expect(dispatch).toHaveBeenCalledWith(addStarships(starships))
    })

    it('should render ItemCard with correct data', () => {
        const dispatch = vi.fn()
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <Starships />
            </Provider>
        )
        const mockUseSelector = vi.fn().mockReturnValue(starships)
      //  vi.spyOn(ReactRedux, "useSelector").mockImplementation(mockUseSelector)
       // vi.spyOn(ReactRedux, "useDispatch").mockReturnValue(dispatch)
        expect(useSelector).toHaveBeenCalled()
        //expect(getByText("X-wing")).toBeInTheDocument()

    })

})

