import Blog from './Blog'
const BlogForm = ({ user,logout,showBlogs,addLike,deleteBlog }) => {
  const listStyle = {
    listStyleType:'none'
  }
  return (
    <>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
      <ul style={listStyle}>
        {showBlogs.map(blog =>
          <li key={blog.id}>
            {<Blog
              blog={blog} updateBlog={addLike}
              deleteBlog={deleteBlog} user={user}/>}
          </li>
        )}
      </ul>
    </>
  )
}
export default BlogForm
