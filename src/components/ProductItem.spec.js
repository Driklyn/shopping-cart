import React from 'react'
import { shallow } from 'enzyme'
import ProductItem from './ProductItem'
import { ADD_TO_CART, REMOVE_FROM_CART, SOLD_OUT, REMAINING } from '../constants/Labels'

const setup = product => {
  const actions = {
    onAddToCartClicked: jest.fn(),
    onRemoveFromCartClicked: jest.fn(),
    onCartQuantityChanged: jest.fn()
  }

  const component = shallow(
    <ProductItem product={product} {...actions} />
  )

  return {
    product: component,
    actions: actions,
    addButton: component.find('.productItem__add'),
    removeButton: component.find('.productItem__remove'),
    quantityInput: component.find('.productItem__quantity')
  }
}

let productProps

describe('ProductItem component', () => {
  beforeEach(() => {
    productProps = {
      title: 'Product 1',
      price: 9.99,
      inventory: 6,
      initialInventory: 6
    }
  })

  it('should render product', () => {
    const { product } = setup(productProps)
    expect(product.instance().props.product).toEqual(productProps)
  })

  it('should render Add To Cart message', () => {
    const { addButton } = setup(productProps)
    expect(addButton.props().children).toEqual(ADD_TO_CART)
  })

  it('should render Remove From Cart message', () => {
    const { removeButton } = setup(productProps)
    expect(removeButton.props().children).toEqual(REMOVE_FROM_CART)
  })

  it('should render quantity input', () => {
    const { quantityInput } = setup(productProps)
    expect(quantityInput.prop('value')).toEqual(0)
  })

  it('should not disable add button', () => {
    const { addButton } = setup(productProps)
    expect(addButton.prop('disabled')).toEqual(false)
  })

  it('should disable remove button', () => {
    const { removeButton } = setup(productProps)
    expect(removeButton.prop('disabled')).toEqual(true)
  })

  it('should call action on add button click', () => {
    const { addButton, actions } = setup(productProps)
    addButton.simulate('click')
    expect(actions.onAddToCartClicked).toBeCalled()
  })

  it('should call action on remove button click', () => {
    const { removeButton, actions } = setup(productProps)
    removeButton.simulate('click')
    expect(actions.onRemoveFromCartClicked).toBeCalled()
  })

  it('should call action on quantity input change', () => {
    const { quantityInput, actions } = setup(productProps)
    quantityInput.simulate('change', { target: { value: 0 } })
    expect(actions.onCartQuantityChanged).toBeCalled()
  })

  describe('when product inventory is 0', () => {
    beforeEach(() => {
      productProps.inventory = 0
    })

    it('should render Sold Out message', () => {
      const { addButton } = setup(productProps)
      expect(addButton.props().children).toEqual(SOLD_OUT)
    })

    it('should disable add button', () => {
      const { addButton } = setup(productProps)
      expect(addButton.prop('disabled')).toEqual(true)
    })

    it('should enable remove button', () => {
      const { removeButton } = setup(productProps)
      expect(removeButton.prop('disabled')).toEqual(false)
    })

    it('should update cart quantity', () => {
      const { quantityInput } = setup(productProps)
      expect(quantityInput.prop('value')).toEqual(productProps.initialInventory)
    })
  })
})
