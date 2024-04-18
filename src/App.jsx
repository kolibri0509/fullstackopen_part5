import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs( blogs )
    )   
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userInfo')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
   
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('userInfo', JSON.stringify(user))
      
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    }
    catch(exeption){
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div> <br />
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div> <br />
      <button type="submit">login</button>
    </form>      
  )
  
  const logout = () => {
    window.localStorage.removeItem('userInfo')
    location.reload()
  }

  const addLike = (id, blogObject) => {
    console.log(blogObject)
    blogService.update(id, blogObject)
  }

  const blogForm = () => {
    const listStyle = {
      listStyleType:'none'
    }
    return (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
        <ul style={listStyle}>
          {blogs.map(blog =><li key={blog.id}>
            {<Blog
            blog={blog} updateBlog={addLike}/>}</li>)}
        </ul>
      </>
    )
  }
  const addBlog = (blogObject) =>{
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog =>
    setBlogs(blogs.concat(returnedBlog)))
    setMessage('a new blog by added')
    setTimeout(()=> setMessage(null),5000)
  }

  const createBlog = () => {
    return (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <CreateBlogForm createBlog={addBlog}/>
        </Togglable>                 
    )
  }

  return (
    <div> 
      <Error message={errorMessage}/>  
      {user === null && loginForm()}
      
      <Notification message={message}/>
      {user !== null && <div>
        {blogForm()} {createBlog()}</div>}
    </div>
  )
}

export default App