import React from 'react'
import PropTypes from 'prop-types'
import ProductItem from './ProductItem'
import Button, { ButtonTypes, ButtonStyles } from './Button'
import { CART_NAME, CART_EMPTY_TIP, CART_TOTAL, CHECKOUT } from '../constants/Labels'
import './Cart.css'

const Cart = ({ products, addButton, removeButton, total, onAddToCartClicked, onRemoveFromCartClicked, onCartQuantityChanged, onCheckoutClicked }) => (
  <div className="cart">
    <h3 className="cart__name">
      {CART_NAME}
    </h3>
    <hr className="cart__divider" />
    {products.length > 0 &&
      <div>
        <div>
          {products.map(product =>
            <ProductItem
              key={product.id}
              product={product}
              addButton={addButton}
              removeButton={removeButton}
              onAddToCartClicked={() => onAddToCartClicked(product.id)}
              onRemoveFromCartClicked={() => onRemoveFromCartClicked(product.id)}
              onCartQuantityChanged={quantity => onCartQuantityChanged(product.id, quantity)}
            />)}
        </div>
        <hr className="cart__divider" />
        <div className="cart__totalContainer">
          <p className="cart__totalLabel">
            {CART_TOTAL}
          </p>
          <p className="cart__totalPrice">
            &#36;{total}
          </p>
        </div>
        <Button
          className="cart__checkout"
          onClick={onCheckoutClicked}
          disabled={products.length <= 0}>
            {CHECKOUT}
        </Button>
      </div>}
    {!products.length &&
      <div className="cart__emptyContainer">
        <img
          className="cart__emptyIcon"
          src="img/cart-gray.svg"
          alt="" />
        <p className="cart__emptyTip">
          {CART_EMPTY_TIP}
        </p>
      </div>}
  </div>
)

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    initialInventory: PropTypes.number.isRequired
  })),
  addButton: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
    style: PropTypes.oneOf(Object.values(ButtonStyles)),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }),
  removeButton: PropTypes.shape({
    type: PropTypes.oneOf(Object.values(ButtonTypes)),
    style: PropTypes.oneOf(Object.values(ButtonStyles)),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  }),
  total: PropTypes.string,
  onAddToCartClicked: PropTypes.func.isRequired,
  onRemoveFromCartClicked: PropTypes.func.isRequired,
  onCartQuantityChanged: PropTypes.func.isRequired,
  onCheckoutClicked: PropTypes.func.isRequired
}

export default Cart
