import React from 'react'
import { render } from '@testing-library/react'
import './Loading.scss'
import '@testing-library/jest-dom'

import { Loading } from './Loading'

describe('Loading', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<Loading />)

    expect(getByTestId('loading')).toBeInTheDocument()
  })
})
