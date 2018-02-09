module.exports = (router) => {
  router
    .get('/', async (ctx, next) => {
      await ctx.render('index')
      await next()
    })
    .get('/*', async (ctx, next) => {
      await ctx.render('index')
      await next()
    })
}
