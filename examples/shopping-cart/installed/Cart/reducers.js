import { combineReducers } from 'redux'
import { createReducer, createAction } from 'redux-act'
import { cartAdd, cartCheckout } from './actions'

const initialState = {
  products: ['123', '234'],
  quantities: { '123': 1, '234': 1 }
}

const products = createReducer({

  [cartAdd.request]: (state, { upc }) => {
    console.log('cartAdd.request', state, upc)
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

}, initialState.products)

const quantities = createReducer({

  [cartAdd.request]: (state, { upc }) => ({
    ...state,
    [upc]: (state[upc] || 0) + 1
  }),

  [cartAdd.ok]: (state) => state,

  [cartAdd.error]: (state, { upc }) => ({
    ...state,
    [upc]: (state[upc]) - 1
  }),

}, initialState.quantities)

export default combineReducers({
  products,
  quantities
})

export function getTotal(state) {
  return state.products.reduce(
    (total, p) =>
      total + getQuantity(state, p), 0
  )
}

export function getQuantity(state, productId) {
  return state.quantities[productId] || 0
}