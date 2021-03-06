import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { stringify, parse } from 'query-string'
import Col from 'react-bootstrap/Col'
import sortBy from 'lodash/sortBy'

import { formatDate } from '../../utils/date'
import { N_GAMES } from '../../constants'
import './index.scss'

function DemoTooltip({ children }) {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return (
      <OverlayTrigger
        overlay={
          <Tooltip id='tooltip-top'>
            Sign up for more flexibility in analytics and historical data.
          </Tooltip>
        }
      >
        {children}
      </OverlayTrigger>
    )
  }

  return <>{children}</>
}

function BetRecommendations({
  recommendations,
  allTeams,
  history,
  location,
  gameIds,
  fetchRecommendations,
  setPastNGames,
  recommendationsLoaded,
}) {
  const [minEv, setMinEv] = useState(1.05)
  const [prevNumPastGames, setPrevNumPastGames] = useState(N_GAMES)
  const [numPastGames, setNumPastGames] = useState(N_GAMES)
  const [minDiff, setMinDiff] = useState(10)
  const [selectedId, setId] = useState()


  useEffect(() => {
    const { betId } = parse(location.search)
    if (betId) {
      setId(betId)
    }
  }, [location, selectedId, setId])

  const trStyle = (selected) => {
    if (!selected) {
      return {}
    }

    return { backgroundColor: 'rgba(0,0,0,.075)' }
  }

  const recommendation = (rec, side) => {
    if (side === 'blue') {
      return {
        id: rec.id,
        side: 'blue',
        date: formatDate(rec.date, { showYear: false }),
        gameId: rec.gameId,
        redGames: rec.redGames,
        blueGames: rec.blueGames,
        team: allTeams[rec.blueSideTeamId].shortName.toUpperCase(),
        teamId: rec.blueSideTeamId,
        opponent: allTeams[rec.redSideTeamId].shortName.toUpperCase(),
        opponentId: rec.redSideTeamId,
        market: rec.market,
        odds: rec.blueOdds.toFixed(2),
        ev: rec.blueEv.toFixed(2),
        teamSuccess: rec.blueSuccess * 100,
        opponentSuccess: rec.redSuccess * 100
      }
    }

    return {
      id: rec.id,
      side: 'red',
      date: formatDate(rec.date, { showYear: false }),
      gameId: rec.gameId,
      redGames: rec.redGames,
      blueGames: rec.blueGames,
      team: allTeams[rec.redSideTeamId].shortName.toUpperCase(),
      teamId: rec.redSideTeamId,
      opponent: allTeams[rec.blueSideTeamId].shortName.toUpperCase(),
      opponentId: rec.blueSideTeamId,
      market: rec.market,
      odds: rec.redOdds.toFixed(2),
      ev: rec.redEv.toFixed(2),
      teamSuccess: rec.redSuccess * 100,
      opponentSuccess: rec.blueSuccess * 100
    }
  }

  const recommendationRow = rec => {
    const betId = `${rec.id}-${rec.teamId}`
    const qs = (() => {
      if (rec.side === 'blue') {
        return stringify({ 
          ...parse(location.search), market: rec.market, blue: rec.teamId, red: rec.opponentId, betId })
      }
      return stringify({ ...parse(location.search), market: rec.market, blue: rec.opponentId, red: rec.teamId, betId })
    })()

    const successDiff = (teamSuccess, oppSuccess) => {
      const diff = teamSuccess - oppSuccess
      if (diff > 0) {
        return <span className='text-success'>{' '}(+{diff.toFixed(0)}%) </span>
      }

      return <span className='text-danger'>{' '}({diff.toFixed(0)}%)</span>
    }

    const uc = str => str.slice(0, 2).toUpperCase() + str.slice(2)
    const title = `${uc(rec.market)} - ${rec.team} vs ${rec.opponent}` 

    return (
      <tr 
        key={betId}
        style={trStyle(betId === selectedId)}
        onClick={() => history.push({ search: qs })}
      >
        <td>{rec.date}</td>
        <td>{title}</td>
        <td>{rec.odds}</td>
        <td>{rec.ev}</td>
        <td>
          {rec.teamSuccess.toFixed(0)}%
          {successDiff(rec.teamSuccess, rec.opponentSuccess)}
        </td>
        <td>{rec.opponentSuccess.toFixed(0)}%</td>
      </tr>
    )
  }

  const fetchAndUpdateNumPastBets = () => {
    if (numPastGames === 0) {
      return
    }

    setPrevNumPastGames(numPastGames)
    setPastNGames({ nGames: numPastGames })
    fetchRecommendations({
      pastNGames: numPastGames,
      gameIds
    })
  }

  const isDemoMode = process.env.REACT_APP_DEMO_MODE === 'true'

  const hasNumPastGamesChanged = numPastGames !== prevNumPastGames
  const filters = (
    <Form.Row>
      <DemoTooltip>
        <Form.Group sm='2' as={Col} controlId='filter-min-ev'>
          <Form.Label>
            <small>Min EV</small>
          </Form.Label>
          <Form.Control 
            disabled={isDemoMode}
            size='sm'
            value={minEv ? minEv : ''}
            onChange={e => setMinEv(e.target.value)}
          />
        </Form.Group>
      </DemoTooltip>

      <DemoTooltip>
        <Form.Group sm='3' as={Col} controlId='filter-diff'>
          <Form.Label>
            <small>Min Diff (%)</small>
          </Form.Label>
          <Form.Control 
            size='sm'
            disabled={isDemoMode}
            value={minDiff ? minDiff : ''}
            onChange={e => setMinDiff(e.target.value)}
          />
        </Form.Group>
      </DemoTooltip>

      <DemoTooltip>
        <Form.Group sm='4' as={Col} controlId='past-games'>
          <Form.Label>
            <small>No. Past games</small>
          </Form.Label>
          <Form.Control 
            size='sm'
            disabled={isDemoMode}
            value={numPastGames ? numPastGames : ''}
            onChange={e => setNumPastGames(parseInt(e.target.value))}
            onKeyPress={e => e.key === 'Enter' && fetchAndUpdateNumPastBets()}
          />
        </Form.Group>
      </DemoTooltip>

      <DemoTooltip>
        <Form.Group sm='3' as={Col} controlId='past-games'>
          <Form.Label className='text-white'>
            <small>Submit</small>
          </Form.Label>
          <Form.Control  
            type='button'
            size='sm'
            value='Go'
            disabled={!hasNumPastGamesChanged || isDemoMode}
            onClick={fetchAndUpdateNumPastBets}
          />
        </Form.Group>
      </DemoTooltip>
    </Form.Row>
  )

  const allRecommdations = [
      ...recommendations.map(x => recommendation(x, 'blue')),
      ...recommendations.map(x => recommendation(x, 'red'))
  ]

  const sortedRecommendations = sortBy(allRecommdations, 'ev')
    .filter(x => {
      const [ev, diff] = [minEv, minDiff].map(parseFloat)
      if (!ev || !diff) {
        return x
      }
      return x.ev > ev && (x.teamSuccess - x.opponentSuccess) > diff
    })
    .reverse()

  const table = (
    <Table hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Matchup</th>
          <th>Odds</th>
          <th>EV</th>
          <th>Success</th>
          <th>Opp. Success</th>
        </tr>
      </thead>

      <tbody>
        {sortedRecommendations.map(recommendationRow)}
      </tbody>
    </Table>
  )

  const content = () => {
    if (!sortedRecommendations.length) {
      if (recommendationsLoaded) {
        return <div className='text-center p-1'>No recommendations available at the moment.</div>
      }

      return <div className='text-center p-1'>Select a league to see the win rate for each team.</div>
    }

    return table
  }

  return (
    <Container id='recommendations-table'>
      <Card>
        <h6 className='text-center'>Upcoming Market Data</h6>
        {filters}
        <small>
          {content()}
        </small>
      </Card>
    </Container>
  )
}

export {
  BetRecommendations
}
