import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
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

  const leagueSelect = () => {
    const text = currLeagueId ? allLeagues[currLeagueId].name : 'Select League'

    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {text}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            leagues.map(league => leagueOption(league, fetchSchedule))
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  const leagueOption = (league, fetchSchedule) => {
    return (
      <Dropdown.Item 
        key={league.id}
        onClick={
          () => {
            fetchSchedule(league.id)
            const qs = stringify({...parse(location.search), league: league.id })
            history.push({ search: `?${qs}` })
          }
        }
      >
        {league.name}
      </Dropdown.Item>
    )
  }

  return (
    <Container>
      <Row>
        {leagueSelect()}
      </Row>

      <UpcomingGamesContainer
        leagueId={selectedLeagueId}
      />
    </Container>
  )
}

export { Schedule }
