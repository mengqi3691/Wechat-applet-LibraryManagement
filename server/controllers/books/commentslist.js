const { mysql } = require('../../qcloud')

module.exports = async (ctx) => {
    const { bookid, openid } = ctx.request.query
    const mysqlSelect = mysql('comments')
        .select('comments.*')
    if (bookid) {
        // 获取图书详情评论列表
        try {
            const commentsList = await mysqlSelect
                .where('bookid', bookid)
            ctx.state.data = {
                result: commentsList
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    errMsg: '图书详情评论列表获取失败' + e.sqlMessage
                }
            }
        }
    } else if (openid) {
        // 获取用户的评论列表
        try {
            const userCommentsList = await mysqlSelect
                .where('openid', openid)
            ctx.state.data = {
                result: userCommentsList
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    errMsg: '用户评论列表获取失败' + e.sqlMessage
                }
            }
        }
    } else {
        // 获取所有的评论列表
        try {
            const allCommentsList = await mysqlSelect
            ctx.state.data = {
                result: allCommentsList
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    errMsg: '评论列表获取失败' + e.sqlMessage
                }
            }
        }
    }
}
