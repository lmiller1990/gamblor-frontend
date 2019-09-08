import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { gamesReducer } from './games/reducer'
import { leagues } from './leagues/reducer'
import { pastGames } from './pastGames/reducer'
import { recommendations } from './recommendations/reducer'
import { teams } from './teams/reducer'
import { teamRankings } from './teamRankings/reducer'


const rootReducer = combineReducers({
  games: gamesReducer,
  leagues,
  pastGames,
  recommendations,
  teams,
  teamRankings,
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
