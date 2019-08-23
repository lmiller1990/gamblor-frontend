import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'

import { UpcomingGames } from './UpcomingGames'
import { fetchRecommendations } from '../../../../store/recommendations/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    games: mapEntities(state.games).filter(x => x.leagueId === ownProps.leagueId),
    allTeams: state.teams.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecommendations: gameIds => dispatch(fetchRecommendations({ gameIds }))
  }
}

const UpcomingGamesContainer = connect(mapStateToProps, mapDispatchToProps)(UpcomingGames)

export { UpcomingGamesContainer }
