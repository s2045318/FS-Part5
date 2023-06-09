import { useState } from 'react'

const BlogForm = ({ createBlog, sendOperationMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author : author,
      url : url
    })
    sendOperationMessage({ title, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit ={addBlog}>
        <div>
          <input
            id='blog-title'
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='blog title...'
          />
        </div>
        <div>
          <input
            id='blog-author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='blog author...'
          />
        </div>
        <div>
          <input
            id='blog-url'
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='blog url...'
          />
        </div>
        <button id='blog-submit' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm