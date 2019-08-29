import React from 'react'
import { Line } from 'react-chartjs-2'
import { parse } from 'query-string'
import round from 'lodash/round'
import sortBy from 'lodash/sortBy'

const data = (xAxisLabels, blueTeamData, redTeamData) => ({
  labels: xAxisLabels,
  datasets: [
    {
      label: 'blue side',
      fill: false,
      backgroundColor: 'blue',
      borderColor: 'blue',
      data: blueTeamData,
    },
    {
      label: 'red side',
      fill: false,
      backgroundColor: 'red',
      borderColor: 'red',
      data: redTeamData,
    }
  ]
})

function MarketLineGraph({ redId, blueId, location, pastGames }) {
  const { market } = parse(location.search)
  const gamesFor = teamId => pastGames.filter(x => x.teamId === teamId)
  const blueGames = sortBy(gamesFor(blueId), ['date', 'gameNumber'])
  const redGames = sortBy(gamesFor(redId), ['date', 'gameNumber'])

  const xAxisLabels = []
  console.log(blueGames, redGames)
  for (let i = 0; i < Math.max(blueGames.length, redGames.length); i++) {
    xAxisLabels.push(i + 1);
  }

  // side is 'red' or 'blue'
  const getSuccessData = (side, teamId, games) => {
    const rates = []
    let wins = 0
    for (let i = 0; i < games.length; i++) {
      const won = games[i][market]
      if (won) {
        wins += 1
      }
      rates.push(wins / (rates.length + 1))
    }

    return rates.map(x => round(x * 100))
  }

  const blueTeamData = [1,2,3]
  const redTeamData = [2,5,3]

  return (
    <div>
      <Line 
        data={
          data(
            xAxisLabels, 
            getSuccessData('blue', blueId, blueGames), 
            getSuccessData('red', redId, redGames), 
          )
        } />
      </div>
  )
}

export { MarketLineGraph }
