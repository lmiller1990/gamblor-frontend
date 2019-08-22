import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { gamesReducer } from './games/reducer'
import { teams } from './teams/reducer'
import { leagues } from './leagues/reducer'

const rootReducer = combineReducers({
  games: gamesReducer,
  leagues,
  teams,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
}

export {
  configureStore
}
