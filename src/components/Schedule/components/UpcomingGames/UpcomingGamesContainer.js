import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'

import { UpcomingGames } from './UpcomingGames'

const mapStateToProps = (state, ownProps) => {
  return {
    games: mapEntities(state.games).filter(x => x.leagueId === ownProps.leagueId),
    allTeams: state.teams.all
  }
}

const mapDispatchToProps = dispatch => {}

const UpcomingGamesContainer = connect(mapStateToProps, mapDispatchToProps)(UpcomingGames)

export { UpcomingGamesContainer }
