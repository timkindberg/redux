import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Cart from '../../installed/SideCart/components/Cart'
import { cartAdd } from '../../installed/SideCart/actions'

import ProductsList from '../../installed/ShoppingGrid/components/ProductsList'

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  render() {
    const { dispatch } = this.props
    return (
      <div>
        <h2>ClickList</h2>
        <hr/>
        <Cart />

        <hr/>
        Will Succeed
        <input type="text" ref={node => this.input1 = node}/>
        <button onClick={() => {
          dispatch(cartAdd({ upc: this.input1.value }))
        }}>Add Item</button>

        <hr/>
        Will Fail
        <input type="text" ref={node => this.input2 = node}/>
        <button onClick={() => {
          dispatch(cartAdd({ upc: this.input2.value, fail: true }))
        }}>Add Item</button>

        <hr/>
        <ProductsList />
      </div>
    )
  }
}

export default connect()(App);