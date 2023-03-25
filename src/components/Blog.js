import { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [hideShow, sethideShow] = useState(false)
  const toggleToggle = () => {
    sethideShow((hideShow) => !hideShow)
  }
  if (!blog.user){
    blog.user = { username: 'user not found' }
  }
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
  const label = hideShow
    ? 'hide'
    : 'view'

  if (hideShow) {
    return (
      <div style={blogStyle} className="detail-view">
        <div>
          <p>{blog.title} by {blog.author} <button id='toggle-toggle' onClick={toggleToggle}>{label}</button></p>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
          <p>{blog.user.username}</p>
          <button id="deletion" onClick={handleDelete}>delete</button>
        </div>
      </div>
    )
  }
  else {
    return(
      <div style={blogStyle} className="default-view">
        <div>
          <p>{blog.title} by {blog.author} <button onClick={toggleToggle}>{label}</button></p>
        </div>
      </div>

    )
  }
}
export default Blog