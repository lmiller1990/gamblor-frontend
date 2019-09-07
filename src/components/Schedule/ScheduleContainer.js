import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { mapEntities } from 'flux-entities'

import { Schedule } from './Schedule'
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
  }
}

const ScheduleContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Schedule))

export {
  ScheduleContainer
}
