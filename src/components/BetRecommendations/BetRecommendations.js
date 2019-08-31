import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import sortBy from 'lodash/sortBy'

import { formatDate } from '../../utils/date'
import './index.scss'

function BetRecommendations({ recommendations, allTeams, history }) {
  const [minEv, setMinEv] = useState(1)
  const [minDiff, setMinDiff] = useState(10)

  const trStyle = (selected) => {
    if (!selected) {
      return {}
    }

    return { backgroundColor: 'rgba(0,0,0,.075)' }
  }
  const [selectedId, setId] = useState()

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

    return (
      <tr 
        key={key}
        style={trStyle(key === selectedId)}
        onClick={() => {
          history.push(param)
          setId(key)
        }}
      >
        <td>{rec.date}</td>
        <td>{rec.team}</td>
        <td>{rec.opponent}</td>
        <td>{rec.market}</td>
        <td>{rec.odds}</td>
        <td>{rec.ev}</td>
        <td>{rec.teamSuccess.toFixed(2)}</td>
        <td>{rec.opponentSuccess.toFixed(2)}</td>
      </tr>
    )
  }

  const filters = (
    <Form.Row>
      <Form.Group as={Col} controlId='filter-min-ev'>
        <Form.Label>Min EV</Form.Label>
        <Form.Control 
          size='sm'
          value={minEv ? minEv : ''}
          onChange={e => setMinEv(parseFloat(e.target.value))}
        />
      </Form.Group>

      <Form.Group as={Col} controlId='filter-diff'>
        <Form.Label>Min Diff</Form.Label>
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
      {filters}
      <small>
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Team</th>
              <th>Opp.</th>
              <th>Market</th>
              <th>Odds</th>
              <th>EV</th>
              <th>Success (%)</th>
              <th>Opp. Success (%)</th>
            </tr>
          </thead>

          <tbody>
            {sortedRecommendations.map(recommendationRow)}
          </tbody>
        </Table>
      </small>
    </Container>
  )
}

export {
  BetRecommendations
}
