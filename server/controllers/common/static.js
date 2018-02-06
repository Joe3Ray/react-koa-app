const serve = require('koa-static')
const path = require('path')

module.exports = router => {
  router.get('/static/*', serve(path.resolve(__dirname, '../..'), {
    maxage: 365 * 24 * 60 * 60 * 1000
  }))
}
