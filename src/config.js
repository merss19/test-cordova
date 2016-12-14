const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const env = process.env.NODE_ENV || DEVELOPMENT

const api = env === PRODUCTION
  ? ''//add here
  : 'http://sport.muhanov.net/api'

const host = env === PRODUCTION
  ? ''//add here
  : 'http://lk.todayme.ru'

export { api, host }
