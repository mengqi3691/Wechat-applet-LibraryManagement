
const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    const { bookid, booktitle, openid, comment, phoneInfo, locationInfo } = ctx.request.body
    if (comment) {
        try {
            await mysql('comments').insert({
                bookid, booktitle, openid, comment, phoneInfo, locationInfo
            })
            ctx.state.data = {
                code: 0,
                result: bookid
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    errMsg: '评论新增失败！' + e.sqlMessage
                }
            }
        }
    }
}
