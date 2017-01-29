import { combineReducers } from 'redux'
import configureStore from 'redux/createStore'

export default () => {
  const rootReducer = combineReducers({
    data: combineReducers({
      auth: require('./authRedux').reducer,
      users: require('./userRedux').reducer,
      notes: require('./noteRedux').reducer,
    })
  })

  return configureStore(rootReducer)
}
