import { useState } from "react"
const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const viewHide = visible ? 'hide' : 'view'
  const displayStyle = {
    display : visible ? '': 'none'}
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

  return(  
    <div style={blogStyle} key={blog.id} >
      {blog.title} 
      <button onClick={visibility}>{viewHide}</button> <br></br>
      <div style={displayStyle}>
        {blog.url} <br></br>
        {likes} <button onClick={() => handleClick(blog.id)}>like</button><br></br>
        {blog.author}
      </div>  
    </div>  
  )
}

export default Blog