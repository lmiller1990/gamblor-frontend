import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'
import sortBy from 'lodash/sortBy'

import { MarketHistory } from './MarketHistory'
import { fetchPastGamesForTeam } from '../../store/pastGames/actions'

const mapStateToProps = (state, { teamId }) => {
  const gamesForTeam = mapEntities(state.pastGames).filter(x => x.teamId === teamId)

  return {
    teamId,
    results: sortBy(gamesForTeam, ['date', 'gameNumber']).reverse().slice(0, state.pastGames.nGames),
    allTeams: state.teams.all,
    nGames: state.pastGames.nGames,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPastGamesForTeam: ({ teamId, nGames }) => dispatch(fetchPastGamesForTeam({ teamId, nGames }))
  }
}

const MarketHistoryContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketHistory)
)

export {
  MarketHistoryContainer
}
