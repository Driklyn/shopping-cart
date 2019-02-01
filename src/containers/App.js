import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCartVisibility } from '../actions'
import { getCartProducts } from '../reducers'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { STORE_NAME, CART_EMPTY, CART_NOT_EMPTY } from '../constants/Labels'
import './App.css'

const App = ({ products, setCartVisibility }) => (
  <div className="app">
    <div className="app__header">
      <h1 className="app__storeName">
        {STORE_NAME}
      </h1>
      <p
        className="app__cart"
        onClick={() => setCartVisibility(true)}>
        <img
          className="app__cartIcon"
          src="/img/cart-black.svg"
          alt="" />
        {products.length > 0 ? CART_NOT_EMPTY : CART_EMPTY}
      </p>
    </div>
    <hr className="app__divider" />
    <ProductsContainer />
    <CartContainer />
  </div>
)

App.propTypes = {
  setCartVisibility: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
})

export default connect(
  mapStateToProps,
  { setCartVisibility }
)(App)
