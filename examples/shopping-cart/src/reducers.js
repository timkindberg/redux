import { combineReducers } from 'redux'
import { default as cart } from '../installed/SideCart/reducers'
import { default as products } from '../installed/ShoppingGrid/reducers'

//export function getTotalQuantity(state) {
//  return getAddedIds(state.cart).reduce((total, id) =>
//    total + getProduct(state.products, id).price * getQuantity(state.cart, id),
//    0
//  ).toFixed(2)
//}
//
//export function getCartProducts(state) {
//  return getAddedIds(state.cart).map(id => Object.assign(
//    {},
//    getProduct(state.products, id),
//    {
//      quantity: getQuantity(state.cart, id)
//    }
//  ))
//}

export default combineReducers({
  cart,
  products
})
