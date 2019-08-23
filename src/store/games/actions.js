import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const FETCH_SCHEDULE_REQUEST = 'FETCH_SCHEDULE_REQUEST'
const FETCH_SCHEDULE_SUCCESS = 'FETCH_SCHEDULE_SUCCESS'
const FETCH_SCHEDULE_FAILURE = 'FETCH_SCHEDULE_FAILURE'

const fetchScheduleRequest = () => ({ type: FETCH_SCHEDULE_REQUEST })
const fetchScheduleSuccess = payload => ({ type: FETCH_SCHEDULE_SUCCESS, payload })
const fetchScheduleFailure = payload => ({ type: FETCH_SCHEDULE_FAILURE, payload })

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
    } catch (e) {
      dispatch(fetchScheduleFailure(e.message))
    }
  }
}

export {
  fetchSchedule,
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
}
