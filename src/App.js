import { useState, useEffect } from 'react'
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


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
   )
  }, [])

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
      setoperationMessage('R Wrong username of password')
      setTimeout(() => {
        setoperationMessage(null)
      }, 5000)
    }
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
  

  const addBlog = async (blogObject) => {
    await blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })

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
  const sendOperationMessage = ({title, author}) => {
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
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new note">
            <BlogForm createBlog={addBlog} sendOperationMessage = {sendOperationMessage}/>
          </Togglable>
          </div>
      }
        
      {blogs.map((blog, i) => 
            <Blog
              key={i}
              blog={blog} 
            />
          )}
    </div>
  )
}

export default App