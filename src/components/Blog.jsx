import { useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const viewHide = visible ? 'hide' : 'view'
  const displayStyle = {
    display : visible ? '': 'none' }
  const blogStyle ={
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const visibility = () => setVisible(!visible)

  const handleClick =  (id) => {
    setLikes(l => l + 1)
    const blogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }
    console.log(blogObject)
    updateBlog(id,blogObject )
  }

  const handleDelete = (id) => {
    if(confirm(`Remove blog ${blog.title} by ${blog.author}!`)){
      deleteBlog(id)
    }
  }

  return(
    <div style={blogStyle} key={blog.id}>
      <div>
        <div className='blog'>
          {blog.title} <br />
          {blog.author}
        </div>
        <button onClick={visibility}>{viewHide}</button> <br></br>
        <div style={displayStyle} className='hidden'>
          {blog.url} <br></br>
          {likes} <button onClick={() => handleClick(blog.id)}>like</button><br></br>
          {/* {blog.author === user.username &&
          <button onClick={() => handleDelete(blog.id)}>remove</button>} */}
        </div>
      </div>
    </div>
  )
}

export default Blog