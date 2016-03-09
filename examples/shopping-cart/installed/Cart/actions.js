import shop from '../../api/shop'
import { createActionAsync } from '../redux-act-helpers'

export const cartAdd = createActionAsync('clicklist/cart/ADD', cartAddApi)
export const cartCheckout = createActionAsync('clicklist/cart/CHECKOUT', cartCheckoutApi)

// Example Usage:
// cartAdd({ upc: '123' })
// cartCheckout()

function cartAddApi(dispatchers, payload, getState) {

  //if (!ifProductHasInventory(getState(), payload.upc)) return;

  dispatchers.request(payload)

  return shop.addProduct(payload)
      .then((res) => dispatchers.ok(payload))
      .catch((err) => dispatchers.error(payload))
}

function cartCheckoutApi(dispatchers, payload, getState) {

  dispatchers.request(payload)

  return shop.buyProducts(payload)
      .then((res) => dispatchers.ok(payload))
      .catch((err) => dispatchers.error(payload))
}

function ifProductHasInventory(state, upc) {
  return state.products.byUpc[upc].inventory > 0
}
