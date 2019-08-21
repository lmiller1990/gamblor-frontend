import { connect } from 'react-redux'

import { MarketLineGraph } from './MarketLineGraph'

const MarketLineGraphContainer = connect()(MarketLineGraph)

export {
  MarketLineGraphContainer
}
