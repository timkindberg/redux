/**
 * Mocking client-server processing
 */
import _products from './products.json'

const TIMEOUT = 300

export default {
  getProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(_products), TIMEOUT)
    })
  },

  addProduct(product) {
    return new Promise((resolve, reject) => {
      console.log(`shop::addProduct::17    product:`, product)
      setTimeout(product.upc && !product.fail
          ? resolve
          : reject.bind(null, 'Product is missing upc'),
      TIMEOUT)
    })
  },

  buyProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, TIMEOUT)
    })
  }
}
