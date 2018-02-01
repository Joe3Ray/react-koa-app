import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import hello from 'con/hello/reducer'

const rootReducer = combineReducers({
  routing,
  hello
})

export default rootReducer
