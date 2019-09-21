import React, { useEffect, useState } from 'react'
import { parse } from 'query-string'
import { isLoaded } from 'flux-entities'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import { fetchTeams } from './store/teams/actions'
import { fetchLeagues } from './store/leagues/actions'
import { ScheduleContainer } from './components/Schedule'
import { BetRecommendationsContainer } from './components/BetRecommendations'
import { MarketLineGraphContainer } from './components/MarketLineGraph'
import { MarketHistoryContainer } from './components/MarketHistory'
import { TeamRankingsContainer } from './components/TeamRankings'


function App({ fetchLeagues, fetchTeams, location, isLoaded, teams }) {
  const [currentTeamIds, setCurrentTeamIds] = useState({ blueId: undefined, redId: undefined })

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  useEffect(() => {
    fetchLeagues()
  }, [fetchLeagues])


  useEffect(() => {
    const { red, blue } = parse(location.search)
    if (red && blue) {
      const blueId = parseInt(blue, 10)
      const redId = parseInt(red, 10)
      setCurrentTeamIds({ blueId, redId })
    }

  }, [location, setCurrentTeamIds])


  const { betId } = parse(location.search)

  const betRecommendationStats = () => {
    if (!betId) {
      return (
        <Card className='h-100 d-flex align-items-center justify-content-center'>
          <small style={{ width: '450px' }}>
            No bet recommendation selected. 
            Select a leage and bet recommendation to view the 
            past data relevant to the recommendation.
          </small>
        </Card>
      )
    }

    return (
      <Card>
        <h6 className='text-center'>Past Games</h6>
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
      </Card>
    )
  }

  const marketLineGraph = () => {
    if (!betId) {
      return
    }

    return (
      <Row>
        <Col>
          <MarketLineGraphContainer 
            redId={currentTeamIds.redId}
            blueId={currentTeamIds.blueId}
          />
        </Col>
      </Row>
    )
  }


  const demoAlert = process.env.REACT_APP_DEMO_MODE === 'true' && (
    <Alert variant='warning'>
      This is a demo of <a href="https://loltrack.app">LolTrack</a>. 
      Sign up <a href='#'>here </a>for full access for Spring Split 2019.
    </Alert>
  )

  const content = () => {
    if (!isLoaded) {
      return <span>Loading...</span>
    }

    return (
      <Container className='p-1'>
        {demoAlert}
        <Row>
          <Col>
            {marketLineGraph()}

            {betRecommendationStats()}
          </Col>

          <Col>
            <Row>
              <ScheduleContainer />
            </Row>

            <Row>
              <TeamRankingsContainer />
            </Row>

            <Row>
              <BetRecommendationsContainer />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }

  return content()
}

const mapStateToProps = state => {
  return {
    isLoaded: isLoaded(state.teams) && isLoaded(state.leagues),
    teams: state.teams
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: () => dispatch(fetchTeams()),
    fetchLeagues: () => dispatch(fetchLeagues()),
  }
}

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

export default AppContainer;
