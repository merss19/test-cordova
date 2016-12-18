const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const env = process.env.NODE_ENV || PRODUCTION

const api = 'https://api.todayme.ru'

const host = env === DEVELOPMENT
  ? 'https://localhost:3000'
  : 'https://lk.todayme.ru'

export { api, host }
