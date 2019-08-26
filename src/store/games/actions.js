import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

import * as types from './constants'
import { fetchRecommendations } from '../recommendations/actions'

const fetchScheduleRequest = () => ({ type: types.FETCH_SCHEDULE_REQUEST })
const fetchScheduleSuccess = payload => ({ type: types.FETCH_SCHEDULE_SUCCESS, payload })
const fetchScheduleFailure = payload => ({ type: types.FETCH_SCHEDULE_FAILURE, payload })

const fetchSchedule = ({ leagueName }) => {
  return async dispatch => {
    try {
      dispatch(fetchScheduleRequest())
      const { data } = await axios.get(`http://localhost:5000/schedule?league=${leagueName.replace(/ /g, '_')}`, {
        transformResponse: [
          (data) => {
            return camelcaseKeys(JSON.parse(data), { deep: true })
          }
        ]
      })

      dispatch(fetchScheduleSuccess(data))
      const gameIds = data.map(x => x.id)
      dispatch(fetchRecommendations({ gameIds }))
    } catch (e) {
      dispatch(fetchScheduleFailure(e.message))
    }
  }
}

export {
  fetchSchedule,
}
