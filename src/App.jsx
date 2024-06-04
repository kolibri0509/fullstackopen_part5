import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
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
  const [sortByLikes, setSortByLikes] = useState(false)
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
      const user = await loginService.login({ username, password })
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

  const deleteBlog = (id) => {
    blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const addLike = (id, blogObject) => {
    console.log(blogObject)
    blogService.update(id, blogObject)
  }

  const shuffle = (arr) => {
    const newArr = [...arr]
    for (let i = newArr.length-1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  }

  const showBlogs = sortByLikes ?
    blogs.sort((a,b) => b.likes - a.likes )
    : shuffle(blogs)

  // const blogForm = () => {
  //   const listStyle = {
  //     listStyleType:'none'
  //   }
  //   return (
  //     <>
  //       <h2>blogs</h2>
  //       <p>{user.name} logged in</p>
  //       <button onClick={logout}>logout</button>
  //       <ul style={listStyle}>
  //         {showBlogs.map(blog => <li key={blog.id}>
  //           {<Blog
  //             blog={blog} updateBlog={addLike}
  //             deleteBlog={deleteBlog} user={user}/>}</li>)}
  //       </ul>
  //     </>
  //   )
  // }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(returnedBlog =>
      setBlogs(blogs.concat(returnedBlog)))
    setMessage('a new blog by added')
    setTimeout(() => setMessage(null),5000)
  }

  const createBlog = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <CreateBlogForm createBlog={addBlog} user={user}/>
      </Togglable>
    )
  }

  return (
    <div>
      <Error message={errorMessage}/>
      {user === null && loginForm()}

      <Notification message={message}/>
      {user !== null &&
        <div>
          {/* {blogForm()} */}
          <BlogForm user={user} logout={logout} showBlogs={showBlogs}
            addLike={addLike} deleteBlog={deleteBlog}/>
          <button onClick={() => setSortByLikes(!sortByLikes)}>
            {sortByLikes ? 'random' : 'sort by likes'}
          </button>
          {createBlog()}
        </div>
      }
    </div>
  )
}

export default App