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
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          <input
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <input
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm