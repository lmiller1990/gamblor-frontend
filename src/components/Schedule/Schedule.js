import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import { UpcomingGamesContainer } from './components/UpcomingGames'

function Schedule({ fetchSchedule, fetchLeagues, leagues  }) {
  const [selectedLeagueName, setSelectedLeagueName] = useState()
  const [selectedLeagueId, setSelectedLeagueId] = useState()

  useEffect(() => {
    fetchLeagues()
  }, [fetchLeagues])

  const selectedLeague = () => {
    if (selectedLeagueName) {
      return selectedLeagueName
    }

    return 'Select League'
  }

  const leagueSelect = (leagues) => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedLeague()}
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
            setSelectedLeagueName(league.name)
            setSelectedLeagueId(league.id)
            fetchSchedule(league.name)
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
        {leagueSelect(leagues)}
      </Row>

      <UpcomingGamesContainer
        leagueId={selectedLeagueId}
      />
    </Container>
  )
}

export { Schedule }
