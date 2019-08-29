import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import moment from 'moment'

import { MarketHistory } from './MarketHistory'
import { fetchPastGamesForTeam } from '../../store/pastGames/actions'

const mapStateToProps = (state, { teamId }) => {
  const gamesForTeam = mapEntities(state.pastGames).filter(x => x.teamId === teamId)
  return {
    teamId,
    results: reverse(sortBy(gamesForTeam, ['date', 'gameNumber'])),
    allTeams: state.teams.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPastGamesForTeam: teamId => dispatch(fetchPastGamesForTeam({ teamId }))
  }
}

const MarketHistoryContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MarketHistory)
)

export {
  MarketHistoryContainer
}
