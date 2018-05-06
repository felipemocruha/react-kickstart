import { applyMiddleware, createStore, combineReducers, compose } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { connectRoutes } from "redux-first-router"
import createHistory from "history/createBrowserHistory"
import appReducer from "reducers/AppReducer"

const routesMap = {
    HOME: "/"
}

const history = createHistory()
const router = connectRoutes(history, routesMap)
const reducer = combineReducers({
    appReducer,
    location: router.reducer
})

const middleware = applyMiddleware(thunk, router.middleware)
const enhancers = composeWithDevTools(middleware, router.enhancer)

export default createStore(reducer, enhancers)