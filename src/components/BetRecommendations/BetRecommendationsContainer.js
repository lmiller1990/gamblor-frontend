import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'

import { BetRecommendations } from './BetRecommendations'

const mapStateToProps = state => {
  return {
    recommendations: mapEntities(state.recommendations),
    allTeams: state.teams.all,
  }
}

const BetRecommendationsContainer = connect(mapStateToProps)(BetRecommendations)

export {
  BetRecommendationsContainer
}
