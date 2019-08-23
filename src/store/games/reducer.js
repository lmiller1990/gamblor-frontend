import { ajaxBaseState } from 'flux-entities'

import {
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
} from './actions'

const initialState = ajaxBaseState()

const gamesReducer = (state = initialState, action) => {
  if (action.type === FETCH_SCHEDULE_REQUEST) {
    return {
      ...state,
      loading: true,
      touched: true
    }
  }

  if (action.type === FETCH_SCHEDULE_FAILURE) {
    return {
      ...state,
      loading: false,
      errors: [action.payload]
    }
  }

  if (action.type === FETCH_SCHEDULE_SUCCESS) {
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
  gamesReducer
}
