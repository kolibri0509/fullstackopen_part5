import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('<CreateBlogForm />', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<CreateBlogForm createBlog={createBlog} />)

  const inputOne = screen.getByPlaceholderText('write text here')
  const inputTwo = screen.getByPlaceholderText('write your name here')
  const inputThree = screen.getByPlaceholderText('write your url here')
  const sendButton = screen.getByText('create')

  await user.type(inputOne, 'setBlogs')
  await user.type(inputTwo, 'kolibri0509')
  await user.type(inputThree, 'https://github.com/kolibri0509')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('setBlogs')
})