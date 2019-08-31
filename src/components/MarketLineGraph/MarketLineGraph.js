import React from 'react'
import Card from 'react-bootstrap/Card'
import { Line } from 'react-chartjs-2'
import { parse } from 'query-string'
import round from 'lodash/round'
import sortBy from 'lodash/sortBy'

import { shortMarketToFullName } from '../../utils/mappers'

const getData = (blueTeamDataset, redTeamDataset) => {
  const xAxisLabels = []
  for (let i = 0; i < Math.max(blueTeamDataset.data.length, redTeamDataset.data.length); i++) {
    xAxisLabels.push(i + 1);
  }

  return {
    labels: xAxisLabels,
    datasets: [
      {
        label: blueTeamDataset.teamName,
        fill: false,
        backgroundColor: 'lightblue',
        borderColor: 'lightblue',
        data: blueTeamDataset.data,
      },
      {
        label: redTeamDataset.teamName,
        fill: false,
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
        borderColor: 'rgba(255, 0, 0, 0.6)',
        data: redTeamDataset.data,
      }
    ]
  }
}

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }]
  }
}

function MarketLineGraph({ redId, blueId, location, pastGames, allTeams }) {
  const { market } = parse(location.search)
  const gamesFor = teamId => pastGames.filter(x => x.teamId === teamId)
  const blueGames = sortBy(gamesFor(blueId), ['date', 'gameNumber'])
  const redGames = sortBy(gamesFor(redId), ['date', 'gameNumber'])

  if (!redId || !blueId) {
    return <></>
  }

  const getSuccessData = (teamId, games) => {
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

  const blueTeamDataset = { 
    teamName: allTeams[blueId].name,
    data: getSuccessData(blueId, blueGames)
  }
  const redTeamDataset = { 
    teamName: allTeams[redId].name,
    data: getSuccessData(redId, redGames)
  }

  return (
    <Card>
      <div className='d-flex justify-content-center'>
        <h6>Success Rate for {shortMarketToFullName(market)}</h6>
      </div>

      <div style={{ height: '300px' }}>
        <Line 
          options={options}
          data={getData(blueTeamDataset, redTeamDataset)} 
        />
      </div>
    </Card>
  )
}

export { MarketLineGraph }
