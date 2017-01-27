import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'

const DEV = process.env.NODE_ENV !== 'production'

export default (rootReducer) => {
  /* REDUX CONFIGURATION */

  const middleware = []

  /* LOGGER MIDDLEWARE */

  if (DEV) {
    const logger = createLogger()
    middleware.push(logger)
  }

  /* ASSEMBLE MIDDLEWARE */

  const store = createStore(rootReducer, compose(applyMiddleware(...middleware)))

  return store
}
