import { connect } from 'react-redux'

import { MarketHistory } from './MarketHistory'

const MarketHistoryContainer = connect()(MarketHistory)

export {
  MarketHistoryContainer
}
