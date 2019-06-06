const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    try {
        const bookrank = await mysql('books')
            .select('id', 'title', 'image', 'count')
            .orderBy('count', 'desc')
            .limit(9)
        ctx.state.data = {
            list: bookrank
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                errMsg: '排行获取失败' + e.sqlMessage
            }
        }
    }
}
