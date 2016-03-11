import shop from '../../api/shop'
import { createActionAsync } from '../redux-act-helpers'

export const getAllProducts = createActionAsync('clicklist/products/GET_ALL', getAllProductsApi)

function getAllProductsApi(dispatchers, payload, getState) {

  dispatchers.request()

  return shop.getProducts()
      .then((res) => dispatchers.ok(res))
      .catch((err) => dispatchers.error(err))
}