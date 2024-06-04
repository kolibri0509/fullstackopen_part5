import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title:'setBlogs',
    author:'kolibri0509',
    url:'https://github.com/kolibri0509',
    likes:2
  }

  const { container } = render(<Blog blog={blog}/>)
  const div = container.querySelector('.blog')
  screen.debug(div)
  expect(div).toHaveTextContent(
    'setBlogs kolibri0509'
  )
})