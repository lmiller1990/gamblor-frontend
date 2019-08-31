import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { formatDate } from '../../../../utils/date'

function UpcomingGames({ games, allTeams }) {
  const showGame = game => {
    const matchup = `${allTeams[game.blueSideTeamId].shortName.toUpperCase()} vs ${allTeams[game.redSideTeamId].shortName.toUpperCase()}`

    return (
      <div key={game.id} className='d-flex'>
        <div style={{ width: '120px' }}>
          {formatDate(game.date)}
        </div>

        <div>
          {matchup}
        </div>
      </div>
    )
  }

  const first5Games = games.slice(0, 5)
  const remaining = games.slice(5)

  return (
    <Row>
      <Col md={6}>
        {first5Games.map(showGame)}
      </Col>

      <Col md={6}>
        {remaining.map(showGame)}
      </Col>
    </Row>
  )
}

export { UpcomingGames }
