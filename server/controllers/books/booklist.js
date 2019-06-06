
const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    console.log('ctx', ctx.request)
    const { page } = ctx.request.query
    const size = 5
    try {
        const books = await mysql('books').select('*')
            .limit(size)
            .offset(Number(page) * size)
            .orderBy('id', 'desc')
        ctx.state.data = {
            list: books
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                errMsg: '列表获取失败' + e.sqlMessage
            }
        }
    }
}
