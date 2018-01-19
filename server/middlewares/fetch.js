const axios = require('axios')

module.exports = () => async (ctx, next) => {
  ctx.fetch = axios
  await next()
}
