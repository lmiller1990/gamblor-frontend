import { connect } from 'react-redux'

import { MarketHistory } from './MarketHistory'
import { fetchPastGamesForTeam } from '../../store/pastGames/actions'

const mapStateToProps = (state, { teamId }) => {
  return {
    teamId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPastGamesForTeam: teamId => dispatch(fetchPastGamesForTeam({ teamId }))
  }
}

const MarketHistoryContainer = connect(mapStateToProps, mapDispatchToProps)(MarketHistory)

export {
  MarketHistoryContainer
}
