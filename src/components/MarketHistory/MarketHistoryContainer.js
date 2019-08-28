import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'
import moment from 'moment'

import { MarketHistory } from './MarketHistory'
import { fetchPastGamesForTeam } from '../../store/pastGames/actions'

const mapStateToProps = (state, { teamId }) => {
  return {
    teamId,
    results: mapEntities(state.pastGames)
    .filter(x => x.teamId === teamId)
    .sort((x, y) => moment(y.date) - moment(x.date)),
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
