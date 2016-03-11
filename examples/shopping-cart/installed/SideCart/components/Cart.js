import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Product from '../../ShoppingGrid/components/Product'
import { cartCheckout } from '../actions'
import { getTotalPrice, getCartProducts } from '../reducers'

export class Cart extends Component {

  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      upc: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })).isRequired,
    total: PropTypes.number,
    onCheckoutClicked: PropTypes.func
  }

  render() {
    const { products, total, onCheckoutClicked } = this.props

    const hasProducts = products.length > 0
    const nodes = !hasProducts
      ? <em>Please add some products to cart.</em>
      : products.map((product, i) =>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            key={i}/>
        )

    return (
      <div>
        <h3>Your Cart</h3>
        <div>{nodes}</div>
        <p>Total: &#36;{total}</p>
        <button onClick={onCheckoutClicked}
          disabled={hasProducts ? '' : 'disabled'}>
          Checkout
        </button>
      </div>
    )
  }
}

export default connect(
    (state) => ({
      products: getCartProducts(state),
      total: getTotalPrice(state)
    }),
    { onCheckoutClicked: cartCheckout }
)(Cart)
