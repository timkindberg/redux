import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../reducers'
import ProductItem from './ProductItem'

// todo: remove bad coupling
import { cartAdd } from '../../../installed/SideCart/actions'

export class ProductsList extends Component {

  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      upc: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired
    })).isRequired,
    addToCart: PropTypes.func.isRequired
  }

  render() {
    const { products } = this.props
    return (
      <div>
        <h3>Products</h3>
        {products.map((product, i)=>
          <ProductItem
            key={i}
            product={product}
            onAddToCartClicked={() => this.props.addToCart(product)} />
        )}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    products: getProducts(state.products)
  }),
  {
    addToCart: cartAdd
  }
)(ProductsList)
