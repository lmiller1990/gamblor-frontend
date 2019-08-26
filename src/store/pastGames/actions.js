import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

import * as types from './constants'

const fetchPastGamesForTeamRequest = () => ({ type: types.FETCH_PAST_GAMES_FOR_TEAM_REQUEST })
const fetchPastGamesForTeamSuccess = payload => ({ type: types.FETCH_PAST_GAMES_FOR_TEAM_SUCCESS, payload })
const fetchPastGamesForTeamFailure = payload => ({ type: types.FETCH_PAST_GAMES_FOR_TEAM_FAILURE, payload })

const fetchPastGamesForTeam = ({ teamId, n = 20 }) => {
  return async dispatch => {
    try {
      dispatch(fetchPastGamesForTeamRequest())
      const { data } = await axios.get(`http://localhost:5000/previous_game_results?team_id=${teamId}&n=${n}`, {
        transformResponse: [
          (data) => {
            return camelcaseKeys(JSON.parse(data), { deep: true })
          }
        ]
      })
      dispatch(fetchPastGamesForTeamSuccess(data))
    } catch (e) {
      dispatch(fetchPastGamesForTeamFailure(e.message))
    }
  }
}

export {
  fetchPastGamesForTeam
}