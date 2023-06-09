import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [operationMessage, setoperationMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef= useRef()
  useEffect(() => {
    refreshBlogs()
  }, [])
  const refreshBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setoperationMessage(`G Welcome Back ${user.realname}`)
      setTimeout(() => {
        setoperationMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setoperationMessage('R Wrong Credentials')
      setTimeout(() => {
        setoperationMessage(null)
      }, 5000)
    }
  }
  const deleteBlog = async (blog) => {
    console.log('delete')
    const response = await blogService.remove(blog.id)
    console.log(response)
    setBlogs(blogs.filter(b => b.id !== blog.id))
    setoperationMessage(`R ${blog.title} by ${blog.author} deleted`)
    setTimeout(() => {
      setoperationMessage(null)
    }, 5000)
  }
  const handleLogout = (event) => {
    event.preventDefault()
    setoperationMessage(`G ${user.username} logged out`)
    setTimeout(() => {
      setoperationMessage(null)
    }, 5000)
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }
  const updateLikes = async (blog) => {
    console.log('blog:',blog)
    await blogService.update(blog.id, blog)
    refreshBlogs()
  //  refreshBlogs()
  }
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService
      .create(blogObject)
    refreshBlogs()
  }
  const operationFlag = () => {
    const flagStyle = {
      color: operationMessage.charAt(0) === 'G' ? 'green' :'red',
      background : operationMessage.charAt(0) === 'G' ? 'lightGreen' :'pink',
      fontSize : 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return (
      <p style={flagStyle}>{operationMessage.slice(2)}</p>
    )
  }
  const sendOperationMessage = ({ title, author }) => {
    console.log('.')
    console.log(title,author)
    setoperationMessage(`G a new blog ${title} by ${author} added`)
    setTimeout(() => {
      setoperationMessage(null)
    }, 5000)
  }
  return (
    <div>
      <h1>Blogs !!!</h1>
      {operationMessage && operationFlag()}
      {user === null ?
        <Togglable buttonLabel1="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>{user.realname} is logged <button onClick={handleLogout}>logout</button></p>
          <Togglable id='open-blogForm' buttonLabel1="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} sendOperationMessage = {sendOperationMessage}/>
          </Togglable>
        </div>
      }
      {(blogs.sort((a,b) => b.likes - a.likes)).map((blog, i) =>
        <Blog
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
          key={i}
          blog={blog}
        />
      )}
    </div>
  )
}

export default App