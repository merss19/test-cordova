const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const env = process.env.NODE_ENV || DEVELOPMENT

const api = 'https://api.todayme.ru/api2'

const host = env === PRODUCTION
  ? 'https://lk2.todayme.ru'
  : 'https://lk2.todayme.ru'//'https://lk2.todayme.ru'//'https://localhost:3000'

export { api, host }
