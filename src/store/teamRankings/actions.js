import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

const FETCH_TEAM_RANKINGS_REQUEST = 'FETCH_TEAM_RANKINGS_REQUEST'
const FETCH_TEAM_RANKINGS_SUCCESS = 'FETCH_TEAM_RANKINGS_SUCCESS'
const FETCH_TEAM_RANKINGS_FAILURE = 'FETCH_TEAM_RANKINGS_FAILURE'

const fetchTeamRankingsRequest = () => ({ type: FETCH_TEAM_RANKINGS_REQUEST })
const fetchTeamRankingsSuccess = payload => ({ type: FETCH_TEAM_RANKINGS_SUCCESS, payload })
const fetchTeamRankingsFailure = payload => ({ type: FETCH_TEAM_RANKINGS_FAILURE, payload })

const fetchTeamRankings = ({ leagueId, pastNGames }) => {
  return async dispatch => {
    try {
      dispatch(fetchTeamRankingsRequest())
      const { data } = await axios.get(`/api/team_rankings?league_id=${leagueId}&past_n_games=${pastNGames}`, {
        transformResponse: [
          data => camelcaseKeys(JSON.parse(data), { deep: true })
        ]
      })

      dispatch(fetchTeamRankingsSuccess(data))
    } catch (e) {
      dispatch(fetchTeamRankingsFailure(e.message))
    }
  }
}

export {
  fetchTeamRankings,
  FETCH_TEAM_RANKINGS_REQUEST,
  FETCH_TEAM_RANKINGS_SUCCESS,
  FETCH_TEAM_RANKINGS_FAILURE,
}
