const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const env = process.env.NODE_ENV || DEVELOPMENT

const api = env === PRODUCTION
  ? ''//add here
  : 'http://sport.muhanov.net/api'

const host = env === PRODUCTION
  ? ''//add here
  : 'http://localhost:3000'

export { api, host }
