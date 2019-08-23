import { ajaxBaseState } from 'flux-entities'

import {
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
} from './actions'

const initialState = ajaxBaseState()

const teams = (state = initialState, action) => {
  if (action.type === FETCH_TEAMS_REQUEST) {
    return {
      ...state,
      loading: true,
      touched: true
    }
  }

  if (action.type === FETCH_TEAMS_FAILURE) {
    return {
      ...state,
      loading: false,
      errors: [action.payload]
    }
  }

  if (action.type === FETCH_TEAMS_SUCCESS) {
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
  teams
}
