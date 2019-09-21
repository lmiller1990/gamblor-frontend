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
    labels: xAxisLabels.reverse(),
    datasets: [
      {
        label: blueTeamDataset.teamName,
        fill: false,
        borderColor: 'skyblue',
        backgroundColor: 'skyblue',
        data: blueTeamDataset.data,
      },
      {
        label: redTeamDataset.teamName,
        fill: false,
        borderColor: 'violet',
        backgroundColor: 'violet',
        data: redTeamDataset.data,
      }
    ]
  }
}

const options = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Number of Past Games'
      },
      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }],

    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Average Success (%)'
      },
      ticks: {
        beginAtZero: true,
        suggestedMax: 100
      }
    }]
  }
}

function MarketLineGraph({ nGames, redId, blueId, location, pastGames, allTeams }) {
  const { market } = parse(location.search)
  const gamesFor = teamId => pastGames.filter(x => x.teamId === teamId)
  // only get most recent n games
  const blueGames = sortBy(gamesFor(blueId), ['date', 'gameNumber'])
    .reverse()
    .slice(0, nGames)
    .reverse()
  const redGames = sortBy(gamesFor(redId), ['date', 'gameNumber'])
    .reverse()
    .slice(0, nGames)
    .reverse()


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
