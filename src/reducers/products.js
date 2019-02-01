import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CHECKOUT_SUCCESS } from '../constants/ActionTypes'

const products = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        inventory: state.inventory - 1
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        inventory: (state.inventory < state.initialInventory) ? state.inventory + 1 : state.inventory
      }
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        inventory: state.initialInventory - action.quantity
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          product.initialInventory = product.inventory
          obj[product.id] = product
          return obj
        }, {})
      }
    case CHECKOUT_SUCCESS:
      for (const productId in state) {
        state[productId].initialInventory = state[productId].inventory
      }
      return state
    default:
      const { productId } = action
      if (productId) {
        return {
          ...state,
          [productId]: products(state[productId], action)
        }
      }
      return state
  }
}

const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products.map(product => product.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))
