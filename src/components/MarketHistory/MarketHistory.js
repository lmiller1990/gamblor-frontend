import React, { useEffect } from 'react'

function MarketHistory({ teamId, fetchPastGamesForTeam }) {
  useEffect(() => {
    console.log('fetching for', teamId)
  }, [teamId, fetchPastGamesForTeam])

  return (
    <div>
      Historty!!
    </div>
  )
}

export {
  MarketHistory
}
