import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title:'setBlogs',
    author:'kolibri0509',
    url:'https://github.com/kolibri0509',
    likes:2
  }
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog}/>
    ).container
  })

  test('renders content', () => {

    const div = container.querySelector('.blog')
    screen.debug(div)
    expect(div).toHaveTextContent(
      'setBlogs kolibri0509'
    )
  })
  test('at start the children are not displayed', () => {

    const div = container.querySelector('.hidden')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.hidden')
    expect(div).not.toHaveStyle('display: none')
  })
})