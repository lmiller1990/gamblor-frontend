const marketMap = {
  'fb': 'First Blood',
  'ft': 'First Turret',
  'fd': 'First Dragon',
  'fbaron': 'First Baron'
}

/**
 * Convert a short market abbreviation to the full name
 * @param {string} market - the market to map, eg 'fb', 'ft', 'fd'
 * @returns {string} the full name of the market in title case
 */
const shortMarketToFullName = market => {
  return marketMap[market]
}

export {
  shortMarketToFullName
}
