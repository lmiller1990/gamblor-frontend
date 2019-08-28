import React, { useEffect } from 'react'
import { parse } from 'query-string'
import moment from 'moment'
import Table from 'react-bootstrap/Table'

const MarketResult = success => 
  <span style={{ fontWeight: success ? 'bold' : '' }}>
    {success ? '✓' : '✘'}
  </span>

function MarketHistory({ teamId, fetchPastGamesForTeam, results, allTeams, location }) {
  useEffect(() => {
    if (!teamId) {
      return
    }

    fetchPastGamesForTeam(teamId)
  }, [teamId, fetchPastGamesForTeam])

  const row = game => {
    const { market } = parse(location.search)
    const opponent = allTeams[game.opponentId].name
    const date = moment(game.date).format('MMM YY')

    return (
      <tr key={game.gameId}>
        <td>{date}</td>
        <td>{opponent}</td>
        <td>{MarketResult(game[market])}</td>
      </tr>
    )
  }

    console.log(results)
  return (
    <div>
      <Table size='sm'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vs</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>
          {results.map(row)}
        </tbody>

      </Table>
    </div>
  )
}

export {
  MarketHistory
}
