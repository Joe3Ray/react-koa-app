import im from 'immutable'
import * as types from './constant'

const initalStateUserInfo = im.fromJS({
  info: ''
})

export default (state = initalStateUserInfo, action) => {
  switch (action.type) {
    case types.FETCH_INFO: {
      const newUserInfo = im.fromJS(action.result)

      return state.set('info', newUserInfo)
    }
    default:
      return state
  }
}
