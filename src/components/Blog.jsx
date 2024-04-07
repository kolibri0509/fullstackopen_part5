import { useState } from "react"
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
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
  return(  
    <div style={blogStyle}>
      {blog.title} 
      <button onClick={visibility}>{viewHide}</button> <br></br>
      <div style={displayStyle}>
        {blog.url} <br></br>
        {blog.likes} <button>like</button><br></br>
        {blog.author}
      </div>  
    </div>  
  )
}

export default Blog