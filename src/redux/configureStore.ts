import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'// debug redux
import { playlist } from './playlist'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      playlist,
    }),
    applyMiddleware(thunk)
  )

  return store
}
