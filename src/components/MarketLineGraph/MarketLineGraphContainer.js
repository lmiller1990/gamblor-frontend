import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'

import { MarketLineGraph } from './MarketLineGraph'

const mapStateToProps = state => {
  const pastGames = mapEntities(state.pastGames)

  return {
    pastGames
  }
}

const MarketLineGraphContainer = withRouter(connect(mapStateToProps)(MarketLineGraph))

export {
  MarketLineGraphContainer
}
