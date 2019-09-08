import React, { useEffect } from 'react'
import { parse } from 'query-string'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'


function TeamRankings({ fetchTeamRankings, rankedTeams, location, teamRankings }) {
  const { league } = parse(location.search)

  useEffect(() => {
    if (!league) {
      return
    }

    fetchTeamRankings({ leagueId: league, pastNGames: 18 })
  }, [league, fetchTeamRankings])

  const sortRanked = () => 
    teamRankings
      .sort((x, y) => y.winrate - x.winrate)
      .map(teamRank =>
        <div key={teamRank.id} className='d-flex'>
          <div style={{ width: '50px' }}>
            {teamRank.shortName.toUpperCase()}
          </div>
          <div>
            {(teamRank.winrate * 100).toFixed(0)}%
          </div>
        </div>
      )


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

  return (
    <Container>
      <Card>
        <h6 className='text-center'>Winrate (last 18 games)</h6>
        <small className='d-flex justify-content-center'>
          {content()}
        </small>
      </Card>
    </Container>
  )
}

export {
  TeamRankings
}
