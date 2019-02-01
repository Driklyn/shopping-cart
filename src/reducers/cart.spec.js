import cart from './cart'

describe('reducers', () => {
  describe('cart', () => {
    const initialState = {
      isVisible: false,
      addedIds: [],
      quantityById: {}
    }

    it('should provide the initial state', () => {
      expect(cart(undefined, {})).toEqual(initialState)
    })

    it('should handle CHECKOUT_REQUEST action', () => {
      expect(cart({}, { type: 'CHECKOUT_REQUEST' })).toEqual(initialState)
    })

    it('should handle CHECKOUT_FAILURE action', () => {
      expect(cart({}, { type: 'CHECKOUT_FAILURE', cart: 'cart state' })).toEqual('cart state')
    })

    it('should handle ADD_TO_CART action', () => {
      expect(cart(initialState, { type: 'ADD_TO_CART', productId: 1 })).toEqual({
        isVisible: false,
        addedIds: [ 1 ],
        quantityById: { 1: 1 }
      })
    })

    it('should handle REMOVE_FROM_CART action', () => {
      expect(cart(initialState, { type: 'REMOVE_FROM_CART', productId: 1 })).toEqual(initialState)
    })

    it('should handle UPDATE_CART_QUANTITY action', () => {
      expect(cart(initialState, { type: 'UPDATE_CART_QUANTITY', productId: 1, quantity: 2 })).toEqual({
        isVisible: false,
        addedIds: [ 1 ],
        quantityById: { 1: 2 }
      })
    })

    describe('when product is already in cart', () => {
      it('should handle ADD_TO_CART action', () => {
        const state = {
          isVisible: false,
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'ADD_TO_CART', productId: 2 })).toEqual({
          isVisible: false,
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 }
        })
      })

      it('should handle REMOVE_FROM_CART action', () => {
        const state = {
          isVisible: false,
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'REMOVE_FROM_CART', productId: 2 })).toEqual({
          isVisible: false,
          addedIds: [ 1 ],
          quantityById: { 1: 1 }
        })
      })

      it('should handle UPDATE_CART_QUANTITY action', () => {
        const state = {
          isVisible: false,
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'UPDATE_CART_QUANTITY', productId: 2, quantity: 2 })).toEqual({
          isVisible: false,
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 }
        })
      })

      it('should handle UPDATE_CART_QUANTITY action', () => {
        const state = {
          isVisible: false,
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'UPDATE_CART_QUANTITY', productId: 2, quantity: 0 })).toEqual({
          isVisible: false,
          addedIds: [ 1 ],
          quantityById: { 1: 1 }
        })
      })
    })
  })
})
