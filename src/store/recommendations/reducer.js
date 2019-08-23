import { ajaxBaseState } from 'flux-entities'

import {
  FETCH_RECOMMENDATIONS_REQUEST,
  FETCH_RECOMMENDATIONS_SUCCESS,
  FETCH_RECOMMENDATIONS_FAILURE,
} from './actions'

const initialState = ajaxBaseState()

const recommendations = (state = initialState, action) => {
  if (action.type === FETCH_RECOMMENDATIONS_REQUEST) {
    return {
      ...state,
      loading: true,
      touched: true
    }
  }

  if (action.type === FETCH_RECOMMENDATIONS_FAILURE) {
    return {
      ...state,
      loading: false,
      errors: [action.payload]
    }
  }

  if (action.type === FETCH_RECOMMENDATIONS_SUCCESS) {
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
  recommendations
}
