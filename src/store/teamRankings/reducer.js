import { ajaxBaseState } from 'flux-entities'

import * as actions from './actions'


const initialState = ajaxBaseState()

const teamRankings = (state = initialState, action) => {
  if (action.type === actions.FETCH_TEAM_RANKINGS_REQUEST) {
    return {
      ...state,
      loading: true,
      touched: true,
    }
  }

  if (action.type === actions.FETCH_TEAM_RANKINGS_FAILURE) {
    return {
      ...state,
      loading: false,
      errors: [action.payload],
    }
  }

  if (action.type === actions.FETCH_TEAM_RANKINGS_SUCCESS) {
    const newState = action.payload.reduce((acc, curr) => {
      return {
        ids: [ ...acc.ids, curr.id ],
        all: { ...acc.all, [curr.id]: curr }
      }
    }, { ids: [], all: {} })

    return {
      ...state,
      ...newState,
      loading: false,
    }
  }

  return state
}

export {
  teamRankings
}
