import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog tests', () => {
  test('renders by default title and author', () => {
    const blog = {
      title: 'I hate christmas',
      author: 'The Grinch',
      url: 'url'
    }
    const { container } = render(<Blog blog={blog}/>)
    const element = container.querySelector('.default-view')
    expect(element).toHaveTextContent('I hate christmas')
    expect(element).toHaveTextContent('The Grinch')
    expect(element).not.toHaveTextContent('url')
  })
  test('renders with click default likes and url and likes', async () => {
    const blog = {
      title: ' I hate christmas ',
      author: 'The Grinch',
      url: 'url'
    }
    const { container } = render(<Blog blog={blog}/>)
    const button = screen.getByText('view')
    await userEvent.click(button)
    const element = container.querySelector('.detail-view')
    expect(element).toHaveTextContent('url')
    expect(element).toHaveTextContent('likes')
  })
})
