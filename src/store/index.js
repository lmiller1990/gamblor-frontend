import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { gamesReducer } from './games/reducer'
import { leagues } from './leagues/reducer'
import { recommendations } from './recommendations/reducer'
import { teams } from './teams/reducer'

const rootReducer = combineReducers({
  games: gamesReducer,
  leagues,
  recommendations,
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
