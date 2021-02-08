import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

import PlayerForm from './player-form'

test('renders Possible cardinal values are', () => {
  render(<PlayerForm />)
  const linkElement = screen.getByText(/Possible cardinal values are/i)
  expect(linkElement).toBeInTheDocument()
})

test("displays invalid path when path doesn't have the correct format", async () => {
  render(<PlayerForm />)
  const input = screen.getByPlaceholderText('Eg. n,n,w,e') as HTMLInputElement

  input.value = 'abc'

  fireEvent.click(screen.getByText('Submit'))

  // Wait for page to update with query text
  const items = await screen.findByText(/Invalid path/)
  expect(items).toBeDefined()
})
