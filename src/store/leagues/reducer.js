import { ajaxBaseState } from 'flux-entities'
import {
  FETCH_LEAGUES_REQUEST,
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_FAILURE,
} from './actions'

const initialState = ajaxBaseState()

const leagues = (state = initialState, action) => {
  if (action.type === FETCH_LEAGUES_REQUEST) {
    return {
      ...state,
      touched: true,
      loading: true,
    }
  }

  if (action.type === FETCH_LEAGUES_SUCCESS) {
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

  if (action.type === FETCH_LEAGUES_FAILURE) {
    return {
      ...state,
      loading: false,
      errors: [action.payload]
    }
  }

  return state
}

export {
  leagues
}
