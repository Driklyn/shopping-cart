import React from 'react'
import PropTypes from 'prop-types'
import Button, { ButtonTypes, ButtonStyles } from './Button'
import { ADD_TO_CART, REMOVE_FROM_CART, SOLD_OUT, REMAINING } from '../constants/Labels'
import './ProductItem.css'

const ProductItem = ({ product, addButton, removeButton, onAddToCartClicked, onRemoveFromCartClicked, onCartQuantityChanged }) => (
  <div className="productItem">
    <img
      className="productItem__photo"
      src={`/img/${product.title.toLowerCase()}.png`/* NOTE: Ideally the JSON would store a `photoUrl` string instead of using `title` here */}
      alt="" />
    <div className="productItem__container">
      <div className="productItem__topContainer">
        <h2 className="productItem__title">
          {product.title}
        </h2>
        <p className="productItem__price">
          &#36;{product.price}
        </p>
      </div>
      <div className="productItem__bottomContainer">
        <p className="productItem__inventory">
          {product.inventory} {REMAINING}
        </p>
        <div className="productItem__actionsContainer">
          {!!onRemoveFromCartClicked &&
            <Button
              className="productItem__remove"
              type={removeButton.type}
              style={removeButton.style}
              onClick={onRemoveFromCartClicked}
              disabled={product.inventory >= product.initialInventory}>
                {(!!removeButton.label && removeButton.label) || REMOVE_FROM_CART}
            </Button>}
          {!!onCartQuantityChanged &&
            <input
              className="productItem__quantity"
              onClick={e => e.target.select()}
              onChange={e => onCartQuantityChanged(parseInt(e.target.value, 10))}
              value={product.initialInventory - product.inventory} />}
          {!!onAddToCartClicked &&
            <Button
              className="productItem__add"
              type={addButton.type}
              style={addButton.style}
              onClick={onAddToCartClicked}
              disabled={product.inventory <= 0}>
                {(!!addButton.label && addButton.label) || (product.inventory > 0 ? ADD_TO_CART : SOLD_OUT)}
            </Button>}
        </div>
      </div>
    </div>
  </div>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired,
    initialInventory: PropTypes.number.isRequired
  }).isRequired,
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
  onAddToCartClicked: PropTypes.func,
  onRemoveFromCartClicked: PropTypes.func,
  onCartQuantityChanged: PropTypes.func
}

ProductItem.defaultProps = {
  addButton: {},
  removeButton: {}
}

export default ProductItem
