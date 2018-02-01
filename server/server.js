require('app-module-path/register')

const Koa = require('koa')
const path = require('path')

const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')

const router = require('lib/router')
const config = require('lib/config')
const fetch = require('middlewares/fetch')

const { port } = config.server

const app = new Koa()

const isDev = app.env === 'development'

app.keys = ['react koa app']

app.use(logger())
app.use(bodyParser())
app.use(fetch())
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    noCache: isDev,
    autoescape: true
  }
}))

// routers
app.use(router.routes(), router.allowedMethods())

/* istanbul ignore if  */
if (require.main === module) {
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`server started at localhost: ${port}`)
  })
} else {
  module.exports = app
}
