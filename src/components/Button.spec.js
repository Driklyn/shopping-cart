import React from 'react'
import { shallow } from 'enzyme'
import Button, { ButtonTypes, ButtonStyles } from './Button'

const render = (props = {}) => {
  return shallow(<Button {...props} />)
}

describe('Button component', () => {
  it('renders using default props', () => {
   const component = render()
   expect(component).toMatchSnapshot()
  })

  it('renders using custom props', () => {
   const component = render({
     className: 'customClassName',
     type: ButtonTypes.secondary,
     style: ButtonStyles.squared,
     disabled: true,
     onClick: jest.fn(),
     children: 'Click me!'
   })

   expect(component).toMatchSnapshot()
  })

  it('calls `onClick` function', () => {
   const onClick = jest.fn()
   const component = render({ onClick })

   component.simulate('click')

   expect(onClick).toBeCalled()
  })
})
