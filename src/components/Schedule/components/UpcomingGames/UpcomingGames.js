import React from 'react'
import moment from 'moment'

function UpcomingGames({ games, allTeams, fetchRecommendations }) {
  const showGame = game => {
    return (
      <div 
        className='d-flex justify-content-between'
        key={game.id}
      >
        <div>
          {moment(game.date).format('YYYY-MM-DD')}
        </div>

        <div>
          {allTeams[game.blueSideTeamId].name}
        </div>

        <div>
          vs
        </div>

        <div>
          {allTeams[game.redSideTeamId].name} 
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        games.map(showGame)
      }
    </div>
  )
}

export { UpcomingGames }
