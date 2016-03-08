import {
  default as cart,
  getQuantity,
  getAddedIds,
} from './reducers/cart';

import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
} from './constants/ActionTypes'

import Cart from './components/Cart'

import {
  addAllProducts,
  addToCart,
  checkout,
} from './actions'

export {
  components: {
    Cart
  },

  reducers: {
    cart,

    helpers: {
      getQuantity,
      getAddedIds,
    }
  },

  actionTypes: {
    ADD_TO_CART,
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAILURE,
  },

  actions: {
    addToCart,
    checkout,
  }
}
