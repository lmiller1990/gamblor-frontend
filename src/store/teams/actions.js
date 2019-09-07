import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const FETCH_TEAMS_REQUEST = 'FETCH_TEAMS_REQUEST'
const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS'
const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE'

const fetchTeamsRequest = () => ({ type: FETCH_TEAMS_REQUEST })
const fetchTeamsSuccess = payload => ({ type: FETCH_TEAMS_SUCCESS, payload })
const fetchTeamsFailure = payload => ({ type: FETCH_TEAMS_FAILURE, payload })

const fetchTeams = () => {
  return async dispatch => {
    try {
      dispatch(fetchTeamsRequest())
      const { data } = await axios.get('/api/teams', {
        transformResponse: [
          data => camelcaseKeys(JSON.parse(data), { deep: true })
        ]
      })

      dispatch(fetchTeamsSuccess(data))
    } catch (e) {
      dispatch(fetchTeamsFailure(e.message))
    }
  }
}

export {
  fetchTeams,
  FETCH_TEAMS_REQUEST,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAMS_FAILURE,
}
