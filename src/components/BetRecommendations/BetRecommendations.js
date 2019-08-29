import React from 'react'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import sortBy from 'lodash/sortBy'

function BetRecommendations({ recommendations, allTeams, history }) {
  const formatDate = date => moment(date).format("MMM Do 'YY")

  const recommendation = (rec, side) => {
    if (side === 'blue') {
      return {
        id: rec.id,
        side: 'blue',
        date: formatDate(rec.date),
        team: allTeams[rec.blueSideTeamId].name,
        teamId: rec.blueSideTeamId,
        opponent: allTeams[rec.redSideTeamId].name,
        opponentId: rec.redSideTeamId,
        market: rec.market,
        odds: rec.blueOdds.toFixed(2),
        ev: rec.blueEv.toFixed(2),
        teamSuccess: rec.blueSuccess.toFixed(2),
        opponentSuccess: rec.redSuccess.toFixed(2)
      }
    }

    return {
      id: rec.id,
      side: 'red',
      date: formatDate(rec.date),
      team: allTeams[rec.redSideTeamId].name,
      teamId: rec.redSideTeamId,
      opponent: allTeams[rec.blueSideTeamId].name,
      opponentId: rec.blueSideTeamId,
      market: rec.market,
      odds: rec.redOdds.toFixed(2),
      ev: rec.redEv.toFixed(2),
      teamSuccess: rec.redSuccess.toFixed(2),
      opponentSuccess: rec.blueSuccess.toFixed(2)
    }
  }

  const recommendationRow = rec => {
    let param = `/?market=${rec.market}`
    if (rec.side === 'blue') {
      param += `&blue=${rec.teamId}&red=${rec.opponentId}`
    } else {
      param += `&blue=${rec.opponentId}&red=${rec.teamId}`
    }

    return (
      <tr 
        key={`${rec.id}-${rec.teamId}`}
        onClick={() => history.push(param)}
      >
        <td>{rec.date}</td>
        <td>{rec.team}</td>
        <td>{rec.opponent}</td>
        <td>{rec.market}</td>
        <td>{rec.odds}</td>
        <td>{rec.ev}</td>
        <td>{rec.teamSuccess}</td>
        <td>{rec.opponentSuccess}</td>
      </tr>
    )
  }

  const sortedRecommendations = sortBy(
    [
      ...recommendations.map(x => recommendation(x, 'blue')),
      ...recommendations.map(x => recommendation(x, 'red'))
    ],'ev').reverse()

  return (
  <div>
    <small>

      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Team</th>
            <th>Opp.</th>
            <th>Market</th>
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
  </div>
  )
}

export {
  BetRecommendations
}
