import { ajaxBaseState } from 'flux-entities'

import * as types from './constants'

const initialState = ajaxBaseState()

const pastGames = (state = initialState, action) => {
  if (action.type === types.FETCH_PAST_GAMES_FOR_TEAM_REQUEST) {
    return {
      ...state,
      loading: true,
      touched: true
    }
  }

  if (action.type === types.FETCH_PAST_GAMES_FOR_TEAM_FAILURE) {
    return {
      ...state,
      loading: false,
      errors: [action.payload]
    }
  }

  if (action.type === types.FETCH_PAST_GAMES_FOR_TEAM_SUCCESS) {
    // since two teams will share a past game, the key will not be unique
    // so, we save the key as teamId | gameId
    // eg say C9 is id = 3 and TL is id 4, and we have a game C9 vs TL with gameId 10
    // we save the game twice, once with key 3|10 and once with 4|10
    const newState = action.payload.reduce((acc, curr) => {
      const id = `${curr.teamId}|${curr.gameId}` 
      return {
        ids: [ ...acc.ids, id],
        all: { ...acc.all, [id]: curr }
      }
    }, { ids: [...state.ids], all: {...state.all} })

    return {
      ...state,
      ...newState,
      loading: false,
    }
  }

  return state
}

export {
  pastGames
}
