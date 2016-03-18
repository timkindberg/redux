import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { cartAdd, cartCheckout } from './actions'

import { getProducts } from '../ShoppingGrid/reducers'

const initialState = {
  productUpcs: [],
  quantityByUpc: {}
}

const productUpcs = createReducer({

  [cartAdd.request]: (state, { upc }) => {
    if (state.includes(upc)) {
      return state
    }
    return [ ...state, upc ]
  },

  [cartAdd.ok]: (state) => state,

  [cartAdd.error]: (state, { upc }) => [
    ...state.slice(null, state.indexOf(upc)),
    ...state.slice(state.indexOf(upc) + 1)
  ],

}, initialState.productUpcs)

const quantityByUpc = createReducer({

  [cartAdd.request]: (state, { upc }) => ({
    ...state,
    [upc]: (state[upc] || 0) + 1
  }),

  [cartAdd.ok]: (state) => state,

  [cartAdd.error]: (state, { upc }) => ({
    ...state,
    [upc]: (state[upc]) - 1
  }),

}, initialState.quantityByUpc)

export default combineReducers({
  productUpcs,
  quantityByUpc
})

// todo: these next two helpers need to access both Cart reducer (.cart) and
// Products reducer (.products). This isn't good. So these helpers can't logically exist in
// either Cart or Products. I had thought to move them out or up to the parent.
export function getCartProducts(state) {
  return getProducts(state.products).filter(p => state.cart.productUpcs.includes(p.upc))
}

// todo: ditto above helper
export function getTotalPrice(state) {
  return getCartProducts(state).reduce(
      (total, p) =>
        total + (p.price * getQuantity(state.cart, p.upc))
      , 0
  )
}

// todo: these helpers are fine. Not coupled.
export function getTotalQuantity(state) {
  return state.productUpcs.reduce(
    (total, p) =>
      total + getQuantity(state, p)
    , 0
  )
}

export function getQuantity(state, productId) {
  return state.quantityByUpc[productId] || 0
}