import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

export default (history, initialState) => {
  const createStoreWithMiddleware = compose(
    applyMiddleware(
      thunk,
      routerMiddleware(history)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
