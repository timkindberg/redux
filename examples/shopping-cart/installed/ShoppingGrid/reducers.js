import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import { getAllProducts } from './actions'

// todo: badly coupled to sidecart's action
import { cartAdd } from '../../installed/SideCart/actions'

const initialState = {
  productsByUpc: {}
}

const productsByUpc = createReducer({

  [getAllProducts.request]: (state) => state,
  [getAllProducts.ok]: (state, products) =>
    products.reduce(
      (result, product) => {
        result[product.upc] = product
        return result
      }
      , {...state}),
  [getAllProducts.error]: (state, err) => state,

  // todo: coupled here
  [cartAdd.request]: (state, product) => {
    return {
      ...state,
      [product.upc]: {
        ...product,
        inventory: product.inventory - 1
      }
    }
  },
  [cartAdd.ok]: (state, product) => state,
  [cartAdd.error]: (state, product) => {
    return {
      ...state,
      [product.upc]: {
        ...product,
        inventory: product.inventory + 1
      }
    }
  },

}, initialState.productsByUpc)

export default combineReducers({
  productsByUpc
})

export function getProducts(state) {
  return Object
      .keys(state.productsByUpc)
      .map(upc => state.productsByUpc[upc])
}