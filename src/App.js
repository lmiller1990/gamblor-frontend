import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { fetchTeams } from './store/teams/actions'
import { ScheduleContainer } from './components/Schedule'
import { BetRecommendationsContainer } from './components/BetRecommendations'
import { MarketLineGraphContainer } from './components/MarketLineGraph'
import { MarketHistoryContainer } from './components/MarketHistory'

function App({ fetchTeams }) {
  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  return (
    <>
      <Row>
        <Col>
          <Row>
            <MarketLineGraphContainer />
          </Row>

          <Row>
            <Col>
              <MarketHistoryContainer />
            </Col>
            <Col>
              <MarketHistoryContainer />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row>
            <ScheduleContainer />
          </Row>

          <Row>
            <BetRecommendationsContainer />
          </Row>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: () => dispatch(fetchTeams())
  }
}

const AppContainer = connect(null, mapDispatchToProps)(App)

export default AppContainer;
