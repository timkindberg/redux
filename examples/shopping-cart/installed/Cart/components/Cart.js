import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//import Product from './Product'
import { cartCheckout } from '../actions'
import { getTotal, getQuantity } from '../reducers'

export class Cart extends Component {

  static propTypes = {
    products: PropTypes.array,
    total: PropTypes.number,
    onCheckoutClicked: PropTypes.func
  }

  render() {
    const { products, total, onCheckoutClicked } = this.props

    const hasProducts = products.length > 0
    const nodes = !hasProducts
      ? <em>Please add some products to cart.</em>
      : products.map((product, i) => <div key={i}>{product}</div>)
        //<Product
        //  title={product.title}
        //  price={product.price}
        //  quantity={product.quantity}
        //  key={product.id}/>

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

const mapStateToProps = (state) => {
  return {
    products: state.products,
    total: getTotal(state)
  }
}

export default connect(
  mapStateToProps,
  { onCheckoutClicked: cartCheckout }
)(Cart)
