import React from 'react'

function UpcomingGames({ games, allTeams }) {
  const showGame = game => {
    return (
      <div 
        className='d-flex justify-content-between'
        key={game.id}
      >
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
