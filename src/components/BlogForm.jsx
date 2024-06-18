import Blog from './Blog'
const BlogForm = ({ user,logout,showBlogs,addLike,deleteBlog }) => {
  const listStyle = {
    listStyleType:'none'
  }
  return (
    <>
      <h2>blogs</h2>
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
