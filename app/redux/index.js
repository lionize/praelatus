import { combineReducers } from 'redux'
import configureStore from 'app/redux/CreateStore'

export default () => {
  const rootReducer = combineReducers({})

  return configureStore(rootReducer)
}
