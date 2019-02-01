import {
  SET_CART_VISIBILITY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'

const initialState = {
  isVisible: false,
  addedIds: [],
  quantityById: {}
}

export const getVisibility = state => state.isVisible

const addedIds = (state = initialState.addedIds, action) => {
  const { productId } = action
  const stateIndex = state.addedIds.indexOf(productId)

  switch (action.type) {
    case ADD_TO_CART:
      if (stateIndex !== -1) {
        return state.addedIds
      }
      return [ ...state.addedIds, productId ]
    case REMOVE_FROM_CART:
      const isUpdatingCartQuantity = action.hasOwnProperty('quantity')

      if (stateIndex !== -1 && ((isUpdatingCartQuantity && action.quantity === 0) || getQuantity(state, productId) <= 1)) {
        return state.addedIds.filter((id, index) => index !== stateIndex)
      }
      return state.addedIds
    case UPDATE_CART_QUANTITY:
      if (action.quantity > 0) {
        return addedIds(state, { ...action, type: ADD_TO_CART })
      } else {
        return addedIds(state, { ...action, type: REMOVE_FROM_CART })
      }
    default:
      return state.addedIds
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action

  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case REMOVE_FROM_CART:
      if (state[productId]) {
        state[productId]--

        if (state[productId] === 0) {
          delete state[productId]
        }
      }
      return state
    case UPDATE_CART_QUANTITY:
      if (action.quantity > 0) {
        return {
           ...state,
           [productId]: action.quantity
        }
      } else {
        delete state[productId]
      }
      return state
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_VISIBILITY:
      return { ...state, isVisible: action.isVisible }
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        isVisible: state.isVisible,
        addedIds: addedIds(state, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
