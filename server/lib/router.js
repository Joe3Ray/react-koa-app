const path = require('path')
const glob = require('glob')
const Router = require('koa-router')

const router = new Router({
  prefix: ''
})

const controllersDir = path.join(__dirname, '../controllers')

glob.sync('**/*.js', {
  cwd: controllersDir
}).forEach((ctrPath) => {
  const ctrPathStr = ctrPath.replace(/([/\\]?index)?\.js$/, '')
  ctrPathStr && require(path.join(controllersDir, ctrPathStr))(router)
})

/**
 * 默认路由
 */
require(controllersDir)(router)

module.exports = router
