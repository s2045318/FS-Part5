import Togglable from './Togglable'

const Blog = ({ deleteBlog, blog, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handleLike = async (event) => {
    blog.likes = blog.likes + 1
    event.preventDefault()
    console.log(blog, blog.id)
    updateLikes(blog)
  }
  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove Blog: ${blog.title} by ${blog.author}`))
    {
      deleteBlog(blog)
    }
  }
  let username = 'user: not found'
  try {
    username = `user: ${blog.user.username}`
  } catch { console.log('no username') }
  return (
    <div style={blogStyle}>
      <span>{ blog.title } { blog.author } </span>
      <Togglable buttonLabel1='view' buttonLabel2='hide'>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={ handleLike }>like</button></div>
        <div>{username}</div>
        <button onClick={ handleDelete }>delete</button>
      </Togglable>
    </div>
  )
}

export default Blog