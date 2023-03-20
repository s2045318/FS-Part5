import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [operationMessage, setoperationMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    refreshBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const refreshBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }
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
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      "title" : title,
      "author" : author,
      "url" : url
    }
    setoperationMessage(`G a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setoperationMessage(null)
      }, 5000)
    await blogService.create(blog)
    setAuthor('')
    setTitle('')
    setUrl('')

    refreshBlogs()
  }
  const logoutButton = () => (
    <div>
      <button onClick = {handleLogout}>Logout</button>
    </div>
  )
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      
      <div>
      <h2>log in to the application</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => {
    console.log(user)
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.realname} is logged in {logoutButton()}</p>
        <div>{blogSubmitForm()}</div>
          {blogs.map((blog, i) => 
            <Blog
              key={i}
              blog={blog} 
            />
          )}
      </div>
    
    )
  }

  const blogSubmitForm = () => {
    return (
      <form onSubmit={handleNewBlog}>
        <div>
          <h2>create new</h2>
            title: 
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
              />
        </div>
        <div>
            author: 
              <input
                type="author"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
        </div>
        <div>
          url: 
            <input 
              type = "text"
              value = {url}
              name = "url"
              onChange={({target}) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
    )
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
  return (
    <div>
      {operationMessage && operationFlag()}
      {user === null && loginForm()}
      {user !== null && blogForm() }
      
    </div>
  )
}

export default App