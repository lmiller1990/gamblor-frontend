import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'

import { UpcomingGames } from './UpcomingGames'

const mapStateToProps = (state, ownProps) => {
  return {
    games: mapEntities(state.games).filter(x => x.leagueId === ownProps.leagueId),
    allTeams: state.teams.all
  }
}

const UpcomingGamesContainer = connect(mapStateToProps)(UpcomingGames)

export { UpcomingGamesContainer }
