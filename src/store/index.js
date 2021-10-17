import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from '../Reducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk]

export default store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)
