import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
   
    try{
      const user = await loginService.login({username, password})
      setUser(user)
      setPassword('')
      setUsername('')
    }
    catch(exeption){
      setErrorMessage('Wrong credentials')
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

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <ul>
          {blogs.map(blog =><li key={blog.id}>{<Blog key={blog.id} blog={blog} />}</li>)}
        </ul>
      </>
    )
  }

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )
}

export default App