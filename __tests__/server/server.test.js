const supertest = require('supertest')
const originConsole = global.console
const fn = () => {}

describe('server 服务', () => {
  let app, server

  beforeEach(async () => {
    app = await require('server')
    // 禁止 console 输出内容
    global.console = {
      log: fn,
      error: fn
    }
  })

  afterEach(() => {
    if (server) {
      server.close()
    }

    app = null
    server = null
    global.console = originConsole
  })

  const request = () => {
    if (!server) {
      server = app.listen(0)
    }

    return supertest(server)
  }

  it('启动正常', () => {
    expect(request).not.toThrow()
  })

  it('app 抛出异常处理', async () => {
    app.use(async ctx => {
      app.emit('error', new Error('app error'), ctx)
      ctx.body = 'ok'
    })

    await request()
      .get('/')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('ok')
      })
  })
})
