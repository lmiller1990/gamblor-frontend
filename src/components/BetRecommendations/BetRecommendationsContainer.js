import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'

import { BetRecommendations } from './BetRecommendations'
import { fetchRecommendations } from '../../store/recommendations/actions'

const mapStateToProps = state => {
  return {
    recommendations: mapEntities(state.recommendations),
    allTeams: state.teams.all,
    gameIds: state.games.ids,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecommendations: ({ gameIds, pastNGames }) => {
      dispatch(fetchRecommendations({ gameIds, pastNGames }))
    }
  }
}

const BetRecommendationsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BetRecommendations)
)

export {
  BetRecommendationsContainer
}
