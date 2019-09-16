import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'
import { withRouter } from 'react-router'

import { MarketLineGraph } from './MarketLineGraph'

const mapStateToProps = state => {
  const pastGames = mapEntities(state.pastGames)
  const allTeams = state.teams.all

  return {
    pastGames,
    allTeams,
    nGames: state.pastGames.nGames,
  }
}

const MarketLineGraphContainer = withRouter(connect(mapStateToProps)(MarketLineGraph))

export {
  MarketLineGraphContainer
}
