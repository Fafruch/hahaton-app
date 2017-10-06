import { combineReducers } from 'redux'
import locationReducer from './location'
import authentication from '../store/authentication'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    authentication,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
