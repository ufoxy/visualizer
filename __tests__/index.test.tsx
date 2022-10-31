import { render, screen } from '@testing-library/react'
import Button from '../src/components/Button/Button'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Button />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})