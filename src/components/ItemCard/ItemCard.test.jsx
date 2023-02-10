import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ItemCard } from './ItemCard'


describe('ItemCard component', () => {
    it('renders correctly', () => {
        const data = {
            name: 'Tatooine',
            terrain: 'Desert',
            population: '200000',
        }
        const errorImg = '/error.png'
        const { container } = render(
            <ItemCard data={data} errorImg={errorImg} />
        )
        expect(container).toMatchSnapshot()
    })

    it('displays the correct image for planets', () => {
        const data = {
            name: 'Tatooine',
            terrain: 'Desert',
            population: '200000',
        }
        const errorImg = '/error.png'
        const { getByAltText } = render(
            <ItemCard data={data} errorImg={errorImg} />
        )
        const img = getByAltText('Tatooine')
        expect(img.getAttribute('src')).toBe('/planets/tatooine.png')
    })

    it('displays the correct image for starships', () => {
        const data = {
            name: 'Millennium Falcon',
            crew: '6',
            cargo_capacity: '100000',
            cost_in_credits: '100000',
            passengers: '6',
        }
        const errorImg = '/error.png'
        const { getByAltText } = render(
            <ItemCard data={data} errorImg={errorImg} />
        )
        const img = getByAltText('Millennium Falcon')
        expect(img.getAttribute('src')).toBe('/starships/millenniumfalcon.png')
    })

    it('displays the error image if the image URL is invalid', () => {
        const data = {
            name: 'Tatooine',
            terrain: 'Desert',
            population: '200000',
        }
        const errorImg = '/error.png'
        const { getByAltText } = render(
            <ItemCard data={data} errorImg={errorImg} />
        )
        const img = getByAltText('Tatooine')
        fireEvent.error(img)
        expect(img.getAttribute('src')).toBe(errorImg)
    })
})


