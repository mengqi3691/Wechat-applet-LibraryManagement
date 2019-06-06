const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    const { id } = ctx.request.query
    try {
        // 浏览量 + 1
        await mysql('books')
            .where('id', id)
            .increment('count', 1)
        // 获取详情
        const bookDetails = await mysql('books')
            .select()
            .where('id', id)
            .first()
        ctx.state.data = bookDetails
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                errMsg: '详情获取失败' + e.sqlMessage
            }
        }
    }
}
