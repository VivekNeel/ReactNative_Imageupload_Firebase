import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

const configureStore = () => {
  const store = createStore(reducers, applyMiddleware(thunk))
  return store
}

export default configureStore
