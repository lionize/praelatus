import React from 'react'
import { render } from 'react-dom'
import createStore from 'app/redux'
import Root from 'app/containers/Root'

const store = createStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
