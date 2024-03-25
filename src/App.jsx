import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

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

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
        <ul>
          {blogs.map(blog =><li key={blog.id}>{<Blog key={blog.id} blog={blog} />}</li>)}
        </ul>
      </>
    )
  }
  const addBlog = (event) =>{
    event.preventDefault()
    if(title.length > 0 && author.length > 0
      && url.length > 0){
        const blogObject = {
          title: title,
          author: author,
          url: url,
          likes:'',
        }
      blogService.create(blogObject).then(returnedBlog =>
      setBlogs(blogs.concat(returnedBlog)))
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(()=> setMessage(null),5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      }
  }
  const createBlog = () => {
    return (
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title: <input type="text" value={title} name='Title'
          onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author: <input type="text" value={author} name='Author'
          onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type="text" value={url} name='Url'
          onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
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