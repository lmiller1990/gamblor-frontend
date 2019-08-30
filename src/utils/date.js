import moment from 'moment'

/**
 * format a date in the format Aug 25th '19
 * @param {string} date to format
 * @returns {string} formatted ddate
 */
const formatDate = date => moment(date).format("MMM Do 'YY")

export {
  formatDate
}
