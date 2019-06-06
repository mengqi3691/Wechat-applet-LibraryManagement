// const { textData } = require('../qcloud')

// module.export = async (ctx, next) => {
// 	const start = new Data().getTime()
// 	await next()
// 	const end = new Data().getTime()
// 	console.log('start', start, 'end', start);
// 	ctx.body = '服务开启成功！';
// }
async function get (ctx, next) {
  ctx.body = '服务开启成功！'
}
async function post (ctx, next) {
  ctx.body = 'success'
}
module.exports = {
    get,
    post
}
