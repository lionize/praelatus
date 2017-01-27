import { combineReducers } from 'redux'
import configureStore from 'app/redux/createStore'

export default () => {
  const rootReducer = combineReducers({})

  return configureStore(rootReducer)
}
