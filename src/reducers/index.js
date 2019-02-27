import { combineReducers } from 'redux'
import user from './user'
import unread from './unread'

export default combineReducers({
  user,
  unread
})
