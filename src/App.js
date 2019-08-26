import React, { useEffect, useState } from 'react'
import { parse } from 'query-string'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { fetchTeams } from './store/teams/actions'
import { ScheduleContainer } from './components/Schedule'
import { BetRecommendationsContainer } from './components/BetRecommendations'
import { MarketLineGraphContainer } from './components/MarketLineGraph'
import { MarketHistoryContainer } from './components/MarketHistory'


function App({ fetchTeams, location }) {
  const [currentTeamIds, setCurrentTeamIds] = useState({ blueId: undefined, redId: undefined })

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])


  useEffect(() => {
    const { red, blue } = parse(location.search)
    if (red && blue) {
      const blueId = parseInt(blue, 10)
      const redId = parseInt(red, 10)
      setCurrentTeamIds({ blueId, redId })
    }

  }, [location, setCurrentTeamIds])

  return (
    <>
      <Row>
        <Col>
          <Row>
            <MarketLineGraphContainer />
          </Row>

          <Row>
            <Col>
              <MarketHistoryContainer
                teamId={currentTeamIds.blueId}
              />
            </Col>
            <Col>
              <MarketHistoryContainer 
                teamId={currentTeamIds.redId}
              />
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
    fetchTeams: () => dispatch(fetchTeams()),
  }
}

const AppContainer = withRouter(connect(null, mapDispatchToProps)(App))

export default AppContainer;
