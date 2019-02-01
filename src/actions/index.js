import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products))
  })
}

export const setCartVisibility = isVisible => ({
  type: types.SET_CART_VISIBILITY,
  isVisible
})

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

const removeFromCartUnsafe = productId => ({
  type: types.REMOVE_FROM_CART,
  productId
})

export const removeFromCart = productId => (dispatch, getState) => {
  const product = getState().products.byId[productId]

  if (product.inventory < product.initialInventory) {
    dispatch(removeFromCartUnsafe(productId))
  }
}

const updateCartQuantityUnsafe = (productId, quantity) => ({
  type: types.UPDATE_CART_QUANTITY,
  productId,
  quantity
})

export const updateCartQuantity = (productId, quantity) => (dispatch, getState) => {
  const maxQuantity = getState().products.byId[productId].initialInventory

  quantity = (Number.isNaN(quantity) || quantity <= 0) ? 0 : ((quantity > maxQuantity) ? maxQuantity : quantity)

  dispatch(updateCartQuantityUnsafe(productId, quantity))
}

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
