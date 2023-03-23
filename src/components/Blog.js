
import Togglable from "./Togglable"

const Blog = ({blog, updateLikes}) => {

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

  let username = "user: not found"
  try {
    username = `user: ${blog.user.username}`
  } catch {
    console.log("no username")
  }
  console.log(username)
  return (
    <div style={blogStyle}>
    {blog.title} {blog.author}
      <Togglable buttonLabel1="view" buttonLabel2="hide">
        {blog.url} <br/> likes {blog.likes} <button onClick={handleLike}>like</button> <br/> {username} <br/>
      </Togglable>
    
  </div>
  )

}

export default Blog