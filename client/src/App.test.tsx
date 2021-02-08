import { render, screen } from '@testing-library/react'
import React from 'react'

import App from './App'

test('renders Destroy Da One Ring', () => {
  render(<App />)
  const linkElement = screen.getByText(/Destroy Da One Ring/i)
  expect(linkElement).toBeInTheDocument()
})
