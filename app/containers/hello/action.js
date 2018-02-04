import * as types from './constant'
import axios from 'axios'

export function fetchUserInfo () {
  return (dispatch) => {
    axios.get('/common/app_info')
      .then(res => {
        if (res.statusText === 'OK' && res.data && res.data.code === 0) {
          dispatch({
            type: types.FETCH_INFO,
            result: res.data.msg
          })
        }
      })
  }
}
