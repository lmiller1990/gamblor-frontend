import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { mapEntities } from 'flux-entities'

import { Schedule } from './Schedule'
import { fetchRecommendations } from '../../store/recommendations/actions'
import { fetchSchedule } from '../../store/games/actions'

const mapStateToProps = state => {
  return {
    allLeagues: state.leagues.all,
    leagues: mapEntities(state.leagues)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSchedule: leagueId => dispatch(fetchSchedule({ leagueId })),
    fetchRecommendations: gameIds => dispatch(fetchRecommendations({ gameIds }))
  }
}

const ScheduleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Schedule))

export {
  ScheduleContainer
}
