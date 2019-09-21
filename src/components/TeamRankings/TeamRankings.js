import React, { useEffect, useState } from 'react'
import capitalize from 'lodash/capitalize'
import { parse } from 'query-string'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

import { Btn } from '../Btn'


function TeamRankings({ nGames, fetchTeamRankings, rankedTeams, location, teamRankings }) {
  const [currentMarket, setCurrentMarket] = useState('winrate')
  const { league } = parse(location.search)

  useEffect(() => {
    if (!league) {
      return
    }

    fetchTeamRankings({ leagueId: league, pastNGames: nGames })
  }, [league, fetchTeamRankings, nGames])

  const sortRanked = () => 
    teamRankings
      .sort((x, y) => y[currentMarket] - x[currentMarket])
      .map(teamRank => {
        return (
          <div key={teamRank.id} className='d-flex'>
            <div style={{ width: '50px' }}>
              {teamRank.shortName.toUpperCase()}
            </div>
            <div>
              {(teamRank[currentMarket] * 100).toFixed(0)}%
            </div>
          </div>
        )
      })


  const content = () => {
    if (!teamRankings.length) {
      return <div className='text-center p-1'>Select a league to see the win rate for each team.</div>
    }

    const ranked = sortRanked()
    const first5Games = ranked.slice(0, 5)
    const remaining = ranked.slice(5)

    return (
      <Row>
        <Col sm={6}>
          {first5Games}
        </Col>
        <Col sm={6}>
          {remaining}
        </Col>
      </Row>
    )
  }

  const marketBtns = (
    <small className='d-flex justify-content-center mt-2'>
      <Btn 
        className='mr-1' 
        isActive={'fb' === currentMarket} 
        handleClick={() => setCurrentMarket('fb')}
      >
        FB
      </Btn>

      <Btn 
        className='mr-1' 
        isActive={'ft' === currentMarket} 
        handleClick={() => setCurrentMarket('ft')}
      >
        FT
      </Btn>

      <Btn 
        className='mr-1' 
        isActive={'fd' === currentMarket} 
        handleClick={() => setCurrentMarket('fd')}
      >
        FD
      </Btn>

      <Btn 
        className='mr-1' 
        isActive={'fbaron' === currentMarket}  
        handleClick={() => setCurrentMarket('fbaron')}
      >
        FBaron
      </Btn>

      <Btn 
        className='mr-1' 
        isActive={'winrate' === currentMarket}  
        handleClick={() => setCurrentMarket('winrate')}
      >
        Winrate
      </Btn>
    </small>
  )

  return (
    <Container>
      <Card>
        <h6 className='text-center'>{capitalize(currentMarket)} (last {nGames} games)</h6>
        <small className='d-flex justify-content-center'>
          {content()}
        </small>
        {marketBtns}
      </Card>
    </Container>
  )
}

export {
  TeamRankings
}
