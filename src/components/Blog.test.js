import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

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

  test('if like button pressed twice like handler called twice', async () => {
    const blog = {
      title: 'I hate christmas',
      author: 'The Grinch',
      url: 'url'
    }
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} updateLikes={mockHandler}/>)


    const viewButton = screen.getByText('view')
    await userEvent.click(viewButton)
    const element = container.querySelector('.detail-view')
    expect(element).toHaveTextContent('url')
    const likeButton = screen.getByText('like')

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('new blog created correctly', async () => {
    //test for new blog form
    //should check that form calls event handler it received as props with right details
    //when new blog created

    const createBlog = jest.fn()
    const sendOperationMessage = jest.fn()
    render(<BlogForm createBlog={createBlog} sendOperationMessage={sendOperationMessage}/>)

    const inputTitle = screen.getByPlaceholderText('blog title...')
    const inputAuthor = screen.getByPlaceholderText('blog author...')
    const inputUrl = screen.getByPlaceholderText('blog url...')
    const sendButton = screen.getByText('save')

    await userEvent.type(inputTitle, 'title')
    await userEvent.type(inputAuthor, 'author')
    await userEvent.type(inputUrl, 'url')
    await userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title')
    expect(createBlog.mock.calls[0][0].author).toBe('author')
    expect(createBlog.mock.calls[0][0].url).toBe('url')

  })
})
