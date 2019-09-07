import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import { stringify, parse } from 'query-string'

import { UpcomingGamesContainer } from './components/UpcomingGames'

function Schedule({ fetchSchedule, allLeagues, leagues, location, history  }) {
  const [currLeagueId, setCurrLeagueId] = useState()

  const selectedLeagueId = (location) => {
    const { league } = parse(location.search)
     
    if (league) {
      return parseInt(league, 10)
    }
  }

  useEffect(() => {
    const selectedId = selectedLeagueId(location)
    if (selectedId && selectedId !== currLeagueId) {
      fetchSchedule(selectedId)
      setCurrLeagueId(selectedId)
    }
  }, [location, fetchSchedule, currLeagueId, setCurrLeagueId])

  const leagueOption = (league, fetchSchedule) => {
    return (
      <option
        key={league.id}
        size='sm'
        value={league.id}
      >
        {league.name}
      </option>
    )
  }

  const handleSelectChange = e => {
    const league = parseInt(e.target.value)
    if (!league) {
      return
    }
    const qs = stringify({...parse(location.search), league })
    history.push({ search: `?${qs}` })
  }

  const filters = (
    <Form.Row>
      <Form.Group as={Col} sm='8' className='m-0' />

      <Form.Group as={Col} sm='4' controlId='filter-league' className='m-0'>
        <Form.Control 
          as='select'
          size='sm'
          onChange={handleSelectChange}
          value={currLeagueId}
        >
          <option>
            Select League
          </option>
          {leagues.map(league => leagueOption(league, fetchSchedule))}
        </Form.Control>
      </Form.Group>
    </Form.Row>
  )

  return (
    <Container>
      <Card>
        <h6 className='text-center'>Schedule</h6>
        {filters}
        <hr className='mt-2 mb-2' />
        <UpcomingGamesContainer
          leagueId={currLeagueId}
        />
      </Card>
    </Container>
  )
}

export { Schedule }
