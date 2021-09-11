import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../Reducer'
import thunk from 'redux-thunk'

const middleware = [thunk]

export default store = createStore(rootReducer, applyMiddleware(...middleware))
