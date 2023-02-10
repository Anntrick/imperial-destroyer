import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Header } from './Header'

describe('Header component', () => {
  it('renders without crashing', () => {
    render(<Header />)
  })

  it('renders the correct title', () => {
    render(<Header />)
    expect(screen.getByText('Imperial destroyers center')).toBeInTheDocument()
  })

})
