import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SideMenu } from './SideMenu'
import { MemoryRouter } from 'react-router-dom'

describe('SideMenu component', () => {
    it('should have class active for selected link', () => {
        const { getByText } = render(
            <MemoryRouter>
                <SideMenu />
            </MemoryRouter>
        )
        const linkToPlanets = getByText(/Planets/i).parentElement
        const linkToStarships = getByText(/Starships/i).parentElement
        
        fireEvent.click(linkToPlanets)
        
        expect(linkToPlanets).toHaveClass('active')
        expect(linkToStarships).not.toHaveClass('active')
        
        fireEvent.click(linkToStarships)
        
        expect(linkToPlanets).not.toHaveClass('active')
        expect(linkToStarships).toHaveClass('active')
    })
})
