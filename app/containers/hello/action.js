import * as types from './constant'

export function fetchUserInfo () {
  return {
    type: types.FETCH_INFO,
    url: '/common/app_info'
  }
}
