import {
  default as products,
  getProduct,
  getVisibleProducts,
} from './reducers/products';

import {
  RECEIVE_PRODUCTS,
} from './constants/ActionTypes'

import Product from './components/Product'
import ProductItem from './components/ProductItem'
import ProductsList from './components/ProductsList'

import {
  getAllProducts,
} from './actions'

export {
  components: {
    Product,
    ProductItem,
    ProductsList,
  },

  reducers: {
    products,

    helpers: {
      getProduct,
      getVisibleProducts,
    }
  },

  actionTypes: {
    RECEIVE_PRODUCTS,
  },

  actions: {
    getAllProducts,
  }
}
