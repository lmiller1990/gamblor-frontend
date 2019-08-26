import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'

import { BetRecommendations } from './BetRecommendations'

const mapStateToProps = state => {
  return {
    recommendations: mapEntities(state.recommendations),
    allTeams: state.teams.all,
  }
}

const BetRecommendationsContainer = withRouter(connect(mapStateToProps)(BetRecommendations))

export {
  BetRecommendationsContainer
}
