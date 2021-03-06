const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const env = process.env.NODE_ENV || DEVELOPMENT

const api = 'https://api2.todayme.ru/api'

const host = env === PRODUCTION
  ? 'https://lk.todayme.ru'
  : 'https://lk2.todayme.ru'//'https://lk.todayme.ru'//'https://localhost:3000'

export { api, host }
