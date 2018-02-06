const execa = require('execa')

module.exports = router => {
  router.post('/githook', async ctx => {
    const { headers } = ctx
    if (
      headers['x-github-event'] &&
      headers['x-github-delivery'] &&
      headers['x-hub-signature']
    ) {
      ctx.status = 200
      ctx.body = {
        code: 0
      }
      execa.shell('npm run deploy')
    } else {
      ctx.status = 403
    }
  })
}
