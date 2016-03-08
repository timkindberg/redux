import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'
import { getAllProducts } from './actions'
import ProductsList from '../components/ProductsList'
import { components as cartComponents } from './installed/Cart'

const { Cart } from cartComponents;

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk ] :
  [ thunk, logger() ]

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

store.dispatch(getAllProducts())

render(
  <Provider store={store}>
    <div>
      <h2>ClickList</h2>
      <hr/>
      <ProductsList />
      <hr/>
      <Cart />
    </div>
  </Provider>,
  document.getElementById('root')
)
