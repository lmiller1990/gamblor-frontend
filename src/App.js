import React, { useEffect, useState } from 'react'
import { parse } from 'query-string'
import { isLoaded } from 'flux-entities'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { fetchTeams } from './store/teams/actions'
import { ScheduleContainer } from './components/Schedule'
import { BetRecommendationsContainer } from './components/BetRecommendations'
import { MarketLineGraphContainer } from './components/MarketLineGraph'
import { MarketHistoryContainer } from './components/MarketHistory'


function App({ fetchTeams, location, isLoaded }) {
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

  const content = () => {
    if (!isLoaded || !currentTeamIds.blueId || !currentTeamIds.redId) {
      return <span />
    }

    return (
      <>
        <Row>
          <Col>
            <Row>
              <Col>
                <MarketLineGraphContainer 
                  redId={currentTeamIds.redId}
                  blueId={currentTeamIds.blueId}
                />
              </Col>
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

  return content()
}

const mapStateToProps = state => {
  return {
    isLoaded: isLoaded(state.teams)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: () => dispatch(fetchTeams()),
  }
}

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

export default AppContainer;
