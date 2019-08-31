import moment from 'moment'

/**
 * format a date in the format Aug 25th '19
 * @param {string} date to format
 * @returns {string} formatted ddate
 */
const formatDate = (date, { showYear } = { showYear: true }) => {
  if (showYear) {
    return moment(date).format("MMM Do 'YY")
  }

  return moment(date).format("MMM Do")
}

export {
  formatDate
}
