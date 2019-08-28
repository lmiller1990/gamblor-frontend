import React from 'react'

function BetRecommendations({ recommendations, allTeams, history }) {
  const recommendation = (rec, side) => {
    if (side === 'blue') {
      return (
        <tr 
          key={rec.id}
          onClick={() => history.push(`/?market=${rec.market}&blue=${rec.blueSideTeamId}&red=${rec.redSideTeamId}`)}
        >
          <td>{rec.date}</td>
          <td>{allTeams[rec.blueSideTeamId].name}</td>
          <td>{allTeams[rec.redSideTeamId].name}</td>
          <td>{rec.market}</td>
          <td>{rec.blueOdds.toFixed(2)}</td>
          <td>{rec.blueEv.toFixed(2)}</td>
          <td>{rec.blueSuccess.toFixed(2)}</td>
          <td>{rec.redSuccess.toFixed(2)}</td>
        </tr>
      )
    }

    return (
      <tr 
        key={rec.id}
        onClick={() => history.push(`/?market=${rec.market}&blue=${rec.blueSideTeamId}&red=${rec.redSideTeamId}`)}
      >
        <td>{rec.date}</td>
        <td>{allTeams[rec.redSideTeamId].name}</td>
        <td>{allTeams[rec.blueSideTeamId].name}</td>
        <td>{rec.market}</td>
        <td>{rec.redOdds.toFixed(2)}</td>
        <td>{rec.redEv.toFixed(2)}</td>
        <td>{rec.redSuccess.toFixed(2)}</td>
        <td>{rec.blueSuccess.toFixed(2)}</td>
      </tr>
    )
  }

  return (
    <div>
      <table>
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
          {recommendations.map(x => recommendation(x, 'blue'))}
          {recommendations.map(x => recommendation(x, 'red'))}
        </tbody>
      </table>
    </div>
  )
}

export {
  BetRecommendations
}
