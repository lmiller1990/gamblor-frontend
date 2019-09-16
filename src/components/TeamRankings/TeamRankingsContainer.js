import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { mapEntities } from 'flux-entities'

import { TeamRankings } from './TeamRankings'
import { fetchTeamRankings } from '../../store/teamRankings/actions'


const mapStateToProps = state => {
  return {
    teamRankings: mapEntities(state.teamRankings),
    nGames: state.pastGames.nGames,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTeamRankings: ({ leagueId, pastNGames }) => {
      dispatch(fetchTeamRankings({ leagueId, pastNGames }))
    }
  }
}

const TeamRankingsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TeamRankings)
)

export {
  TeamRankingsContainer
}
