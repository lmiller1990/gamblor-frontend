import { connect } from 'react-redux'
import { mapEntities } from 'flux-entities'

import { Schedule } from './Schedule'
import { fetchLeagues } from '../../store/leagues/actions'
import { fetchSchedule } from '../../store/games/actions'

const mapStateToProps = state => {
  return {
    leagues: mapEntities(state.leagues)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLeagues: () => dispatch(fetchLeagues()),
    fetchSchedule: leagueName => dispatch(fetchSchedule({ leagueName }))
  }
}
const ScheduleContainer = connect(mapStateToProps, mapDispatchToProps)(Schedule)

export {
  ScheduleContainer
}
