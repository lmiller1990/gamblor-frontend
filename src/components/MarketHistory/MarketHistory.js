import React, { useEffect } from 'react'
import { parse } from 'query-string'
import moment from 'moment'
import Table from 'react-bootstrap/Table'

function MarketHistory({ teamId, fetchPastGamesForTeam, results, allTeams, location }) {
  useEffect(() => {
    if (!teamId) {
      return
    }

    fetchPastGamesForTeam(teamId)
  }, [teamId, fetchPastGamesForTeam])

  const marketResult = success => {
    return (
      <td 
        className='d-flex justify-content-center'
        style={{ backgroundColor: success ? 'cornflowerblue' : 'red' }}
      >
        <span style={{ fontWeight: success ? 'bold' : '' }}>
          {success ? '✓' : '✘'}
        </span>
      </td>
    )
  }

  const row = game => {
    const { market } = parse(location.search)
    const opponent = allTeams[game.opponentId].name
    const date = moment(game.date).format("MMM Do 'YY")
    const success = game[market]

    const key = `${game.gameId}-${game.gameNumber}-${game.teamId}`
    return (
      <tr key={key}>
        <td>{date}</td>
        <td>{opponent} ({game.gameNumber}) {key}</td>
        {marketResult(success)}
      </tr>
    )
  }

  return (
    <div>
      <h5>{allTeams[teamId].name}</h5>
      <small>
        <Table size='sm'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>Result</th>
            </tr>
          </thead>

          <tbody>
            {results.map(row)}
          </tbody>

        </Table>
      </small>
    </div>
  )
}

export {
  MarketHistory
}
