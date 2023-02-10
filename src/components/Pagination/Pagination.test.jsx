import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Pagination } from './Pagination'
import { vi } from 'vitest'

describe('Pagination component', () => {
  it('renders correctly with initial props', () => {
    const { getByText } = render(
      <Pagination 
        currentPage={1}
        setCurrentPage={() => {}}
        totalItems={10}
        itemsPerPage={5}
      />
    )
    
    expect(getByText('1')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('«')).toBeInTheDocument()
    expect(getByText('»')).toBeInTheDocument()
  })

  it('changes page when clicking on page number', () => {
    const setCurrentPage = vi.fn()
    
    const { getByText } = render(
      <Pagination 
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalItems={10}
        itemsPerPage={5}
      />
    )

    fireEvent.click(getByText('2'))
    expect(setCurrentPage).toHaveBeenCalledWith(2)
  })

  it('disables previous button on first page', () => {
    const setCurrentPage = vi.fn()
    
    const { getByText } = render(
      <Pagination 
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalItems={10}
        itemsPerPage={5}
      />
    )

    const prevButton = getByText('«')
    expect(prevButton).toHaveAttribute('disabled')

    fireEvent.click(prevButton)
    expect(setCurrentPage).not.toHaveBeenCalled()
  })

  it('disables next button on last page', () => {
    const setCurrentPage = vi.fn()
    
    const { getByText } = render(
      <Pagination 
        currentPage={2}
        setCurrentPage={setCurrentPage}
        totalItems={10}
        itemsPerPage={5}
      />
    )

    const nextButton = getByText('»')
    expect(nextButton).toHaveAttribute('disabled')

    fireEvent.click(nextButton)
    expect(setCurrentPage).not.toHaveBeenCalled()
  })
})
