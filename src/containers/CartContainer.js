import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart, removeFromCart, updateCartQuantity, checkout, setCartVisibility } from '../actions'
import { getCartVisibility, getCartProducts, getTotal } from '../reducers'
import Cart from '../components/Cart'
import { ButtonTypes, ButtonStyles } from '../components/Button'
import './CartContainer.css'

const setPageScrolling = isAllowed => {
  document.body.style.overflow = !isAllowed ? 'hidden' : ''
  return true
}

const CartContainer = ({ isVisible, products, total, addToCart, removeFromCart, updateCartQuantity, checkout, setCartVisibility }) => (
  setPageScrolling(!isVisible) && isVisible &&
    <div
      className="cartModal"
      onClick={e => e.target.classList.contains('cartModal') && setCartVisibility(false)}>
      <div className="cartModal__container">
        <div className="cartModal__contents">
          <img
            className="cartModal__closeIcon"
            src="img/close-icon.svg"
            onClick={() => setCartVisibility(false)}
            alt="" />
          <Cart
            products={products}
            removeButton={{
              type: ButtonTypes.secondary,
              style: ButtonStyles.roundedLeft,
              label: '\u2013'
            }}
            addButton={{
              type: ButtonTypes.secondary,
              style: ButtonStyles.roundedRight,
              label: '\u002b'
            }}
            total={total}
            onAddToCartClicked={addToCart}
            onRemoveFromCartClicked={removeFromCart}
            onCartQuantityChanged={updateCartQuantity}
            onCheckoutClicked={() => checkout(products)} />
        </div>
      </div>
    </div>
)

CartContainer.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  setCartVisibility: PropTypes.func.isRequired
}

CartContainer.defaultProps = {
  isVisible: false
}

const mapStateToProps = (state) => ({
  isVisible: getCartVisibility(state),
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { addToCart, removeFromCart, updateCartQuantity, checkout, setCartVisibility }
)(CartContainer)
