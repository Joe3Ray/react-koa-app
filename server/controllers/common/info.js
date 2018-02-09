module.exports = router => {
  router.get('/common/app_info', async (ctx, next) => {
    ctx.body = {
      code: 0,
      msg: 'this is react-koa-app'
    }
    await next()
  })
}
