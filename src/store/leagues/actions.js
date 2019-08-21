import axios from 'axios'

const FETCH_LEAGUES_REQUEST = 'FETCH_LEAGUES_REQUEST'
const FETCH_LEAGUES_SUCCESS = 'FETCH_LEAGUES_SUCCESS'
const FETCH_LEAGUES_FAILURE = 'FETCH_LEAGUES_FAILURE'

const fetchLeaguesRequest = () => ({ type: FETCH_LEAGUES_REQUEST })
const fetchLeaguesSuccess = payload => ({ type: FETCH_LEAGUES_SUCCESS, payload })
const fetchLeaugesFailure = payload => ({ type: FETCH_LEAGUES_FAILURE, payload })

const fetchLeagues = () => {
  return async dispatch => {
    try {
      dispatch(fetchLeaguesRequest())
      const { data } = await axios.get('http://localhost:5000/leagues')
      dispatch(fetchLeaguesSuccess(data))
    } catch (e) {
      dispatch(fetchLeaugesFailure(e.message))
    }
  }
}

export {
  fetchLeagues,
  FETCH_LEAGUES_REQUEST,
  FETCH_LEAGUES_SUCCESS,
  FETCH_LEAGUES_FAILURE,
}
