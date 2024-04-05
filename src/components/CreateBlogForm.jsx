import { useState } from "react"
const CreateBlogForm = ({createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    if(title.length > 0 && author.length > 0
      && url.length > 0){
       createBlog({
          title: title,
          author: author,
          url: url,
        })
      }
    setTitle('')
    setAuthor('')
    setUrl('')
  }
    return (
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title: <input type="text" value={title} name='Title'
          onChange={event=> setTitle(event.target.value)}/>
        </div>
        <div>
          author: <input type="text" value={author} name='Author'
          onChange={event=> setAuthor(event.target.value)} />
        </div>
        <div>
          url: <input type="text" value={url} name='Url'
          onChange={event=> setUrl(event.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    )
  }
  export default CreateBlogForm