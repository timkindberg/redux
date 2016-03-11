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

export function getCartProducts(state) {
  return getProducts(state.products).filter(p => state.cart.productUpcs.includes(p.upc))
}

export function getTotalPrice(state) {
  return getCartProducts(state).reduce(
      (total, p) =>
        total + (p.price * getQuantity(state.cart, p.upc))
      , 0
  )
}

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