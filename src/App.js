import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { ScheduleContainer } from './components/Schedule'
import { BetRecommendationsContainer } from './components/BetRecommendations'
import { MarketLineGraphContainer } from './components/MarketLineGraph'
import { MarketHistoryContainer } from './components/MarketHistory'

function App() {
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

export default App;
