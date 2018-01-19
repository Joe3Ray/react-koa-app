module.exports = (router) => {
  router
    .get('/', async (ctx) => {
      await ctx.render('index')
    })
    .get('/*', async (ctx) => {
      await ctx.render('index')
    })
}
