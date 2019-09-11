import { connect } from 'react-redux'
import { mapEntities, isLoaded } from 'flux-entities'
import { withRouter } from 'react-router'

import { BetRecommendations } from './BetRecommendations'
import { fetchRecommendations } from '../../store/recommendations/actions'
import { setPastNGames } from '../../store/pastGames/actions'

const mapStateToProps = state => {
  return {
    recommendations: mapEntities(state.recommendations),
    allTeams: state.teams.all,
    gameIds: state.games.ids,
    recommendationsLoaded: isLoaded(state.recommendations),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecommendations: ({ gameIds, pastNGames }) => {
      dispatch(fetchRecommendations({ gameIds, pastNGames }))
    },

    setPastNGames: ({ nGames }) => {
      dispatch(setPastNGames({ nGames }))
    },
  }
}

const BetRecommendationsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BetRecommendations)
)

export {
  BetRecommendationsContainer
}
