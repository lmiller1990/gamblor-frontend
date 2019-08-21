import { connect } from 'react-redux'

import { BetRecommendations } from './BetRecommendations'

const BetRecommendationsContainer = connect()(BetRecommendations)

export {
  BetRecommendationsContainer
}
