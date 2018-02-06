/* eslint no-console: 0 */
const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const glob = require('glob')
const execa = require('execa')
const Promise = require('bluebird')

Promise.promisifyAll(fs)

console.log('start compiling...')

let startTime = Date.now()
let env = process.env.NODE_ENV || 'development'

console.log(`using ${env} config`)

const root = path.join(__dirname, '..')
const processPath = path.join(root, 'process.json')
const viewsPath = path.join(root, 'server/views')
const configPath = path.join(root, `config/webpack.config.${env}`)

const config = require(configPath)
const pkg = require('../package.json')
const processJson = require(processPath)

const buildPath = config.output.path
const pkgName = pkg.name

Promise.resolve()
  .then(() => {
    console.log('clean views and build path')

    // 清理 views && output.path
    return Promise.all([fs.removeAsync(viewsPath), fs.removeAsync(buildPath)])
  })
  .then(() => {
    console.log('update process.json')

    // 更新 process.json
    processJson.apps.forEach(app => {
      if (app.name.indexOf(pkgName) !== 0) {
        app.name = `${pkgName}-${app.name}`
      }
    })

    return fs.writeJsonAsync(processPath, processJson)
  })
  .then(() => {
    console.log('webpack building...')

    // webpack 编译
    return new Promise((resolve, reject) => {
      webpack(config, (err, stats) => {
        if (err || stats.hasErrors()) {
          console.log(
            stats.toString({
              colors: true,
              timings: true,
              hash: true,
              version: true,
              errorDetails: true,
              assets: false,
              chunks: false,
              children: false,
              modules: false,
              chunkModules: false
            })
          )

          return reject(err)
        }

        const time = (stats.endTime - stats.startTime) / 1000

        console.log(`webpack build success in ${time.toFixed(2)} s`)

        resolve()
      })
    })
  })
  .then(() => {
    console.log('move views template')

    // 移动模版文件
    const templates = glob.sync('**/*.html', {
      cwd: buildPath
    })

    return Promise.map(templates, template => {
      const srcPath = path.join(buildPath, template)
      const distPath = path.join(viewsPath, template)

      return fs.moveAsync(srcPath, distPath, {
        clobber: true
      })
    })
  })
  .then(() => {
    const time = (Date.now() - startTime) / 1000
    console.log(`compile success in ${time.toFixed(2)} s`)
  })
  .then(() => {
    console.log('start deploying...')

    startTime = Date.now()

    // 启动 Node 服务
    return execa
      .shell(`pm2 startOrRestart process.json --only ${pkgName}-${env}`)
      .then(ret => {
        console.log(ret.stdout)
      })
  })
  .then(() => {
    const time = (Date.now() - startTime) / 1000
    console.log(`deploy success in ${time.toFixed(2)} s`)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
