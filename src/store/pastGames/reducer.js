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
    // add on top of existing games in state
    const newState = action.payload.reduce((acc, curr) => {
      return {
        ids: [ ...acc.ids, curr.gameId ],
        all: { ...acc.all, [curr.gameId]: curr }
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
