import camelcaseKeys from 'camelcase-keys'

const camelcase = data => camelcaseKeys(data, { deep: true })

const mockAxios = {
  get: url => {
    if (url.includes('teams')) {
      return {
        data: camelcase(require('./teams.json'))
      }
    }

    if (url.includes('leagues')) {
      return {
        data: camelcase(require('./leagues.json'))
      }
    }

    if (url.includes('recommendations')) {
      return {
        data: camelcase(require('./recommendations.json'))
      }
    }

    if (url.includes('team_rankings')) {
      return {
        data: camelcase(require('./team_rankings.json'))
      }
    }

    if (url.includes('schedule')) {
      return {
        data: camelcase(require('./schedule.json'))
      }
    }

    if (url.includes('team_id=118')) {
      return {
        data: camelcase(require('./team_id=118.json'))
      }
    }

    if (url.includes('team_id=119')) {
      return {
        data: camelcase(require('./team_id=119.json'))
      }
    }

    if (url.includes('team_id=121')) {
      return {
        data: camelcase(require('./team_id=121.json'))
      }
    }

    if (url.includes('team_id=122')) {
      return {
        data: camelcase(require('./team_id=122.json'))
      }
    }
  }
}

export {
  mockAxios
}
