import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

import { N_GAMES } from '../../constants'

const FETCH_RECOMMENDATIONS_REQUEST = 'FETCH_RECOMMENDATIONS_REQUEST'
const FETCH_RECOMMENDATIONS_SUCCESS = 'FETCH_RECOMMENDATIONS_SUCCESS'
const FETCH_RECOMMENDATIONS_FAILURE = 'FETCH_RECOMMENDATIONS_FAILURE'

const fetchRecommendationsRequest = () => ({ type: FETCH_RECOMMENDATIONS_REQUEST })
const fetchRecommendationsSuccess = payload => ({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload })
const fetchRecommendationsFailure = payload => ({ type: FETCH_RECOMMENDATIONS_FAILURE, payload })

const fetchRecommendations = ({ gameIds, pastNGames = N_GAMES }) => {
  return async dispatch => {
    try {
      dispatch(fetchRecommendationsRequest())
      const { data } = await axios.get(`/api/recommendations?past_n_games=${pastNGames}&game_ids=${gameIds}`, {
        transformResponse: [
          (data) => {
            return camelcaseKeys(JSON.parse(data), { deep: true })
          }
        ]
      })

      dispatch(fetchRecommendationsSuccess(data))
    } catch (e) {
      dispatch(fetchRecommendationsFailure(e.message))
    }
  }
}

export {
  fetchRecommendations,
  FETCH_RECOMMENDATIONS_REQUEST,
  FETCH_RECOMMENDATIONS_SUCCESS,
  FETCH_RECOMMENDATIONS_FAILURE,
}
