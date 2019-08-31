import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import sortBy from 'lodash/sortBy'

import { formatDate } from '../../utils/date'
import './index.scss'

function BetRecommendations({ recommendations, allTeams, history }) {
  const [minEv, setMinEv] = useState(1)
  const [minDiff, setMinDiff] = useState(10)
  const [selectedId, setId] = useState()

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
    let param = `/?market=${rec.market}`
    if (rec.side === 'blue') {
      param += `&blue=${rec.teamId}&red=${rec.opponentId}`
    } else {
      param += `&blue=${rec.opponentId}&red=${rec.teamId}`
    }
    const key = `${rec.id}-${rec.teamId}`
    
    const successDiff = (teamSuccess, oppSuccess) => {
      const diff = teamSuccess - oppSuccess
      if (diff > 0) {
        return <span className='text-success'>{' '}(+{diff.toFixed(0)}%) </span>
      }

      return <span className='text-danger'>{' '}({diff.toFixed(0)}%)</span>
    }

    const title = `${rec.market.toUpperCase()} - ${rec.team} vs ${rec.opponent}` 

    return (
      <tr 
        key={key}
        style={trStyle(key === selectedId)}
        onClick={() => { history.push(param); setId(key) } }
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

  const filters = (
    <Form.Row>
      <Form.Group as={Col} controlId='filter-min-ev'>
        <Form.Label>
          <small>Min EV</small>
        </Form.Label>
        <Form.Control 
          size='sm'
          value={minEv ? minEv : ''}
          onChange={e => setMinEv(parseFloat(e.target.value))}
        />
      </Form.Group>

      <Form.Group as={Col} controlId='filter-diff'>
        <Form.Label>
          <small>Min Success Diff (%)</small>
        </Form.Label>
        <Form.Control 
          size='sm'
          value={minDiff ? minDiff : ''}
          onChange={e => setMinDiff(parseFloat(e.target.value))}
        />
      </Form.Group>
    </Form.Row>
  )

  const allRecommdations = [
      ...recommendations.map(x => recommendation(x, 'blue')),
      ...recommendations.map(x => recommendation(x, 'red'))
  ]

  const sortedRecommendations = sortBy(allRecommdations, 'ev')
    .filter(x => {
      if (!minEv || !minDiff) {
        return x
      }
      return x.ev > minEv && ((x.teamSuccess - x.opponentSuccess) > minDiff)
    })
    .reverse()

  return (
    <Container id='recommendations-table'>
      <Card>
        <h6 className='text-center'>Upcoming Market Data</h6>
        {filters}
        <small>
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
        </small>
      </Card>
    </Container>
  )
}

export {
  BetRecommendations
}
