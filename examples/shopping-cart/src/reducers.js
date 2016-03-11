import { combineReducers } from 'redux'
import { default as cart } from '../installed/SideCart/reducers'
import { default as products } from '../installed/ShoppingGrid/reducers'

export default combineReducers({
  cart,
  products
})
