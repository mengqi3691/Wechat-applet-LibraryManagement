
const https = require('https')
const { mysql } = require('../../qcloud')

// 新增图书
// 1、获取豆瓣信息 2、入库
module.exports = async (ctx) => {
    const { bookinfo } = ctx.request.body
    if (bookinfo) {
        // let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        // const bookinfo = await getJSON(url)
        console.log('图书信息', bookinfo)
        const rate = bookinfo.tating.average
        const { title, image, alt, publisher, summary, price } = bookinfo
        const tags = bookinfo.tags.map((el) => {
            return `${el.title} ${el.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        try {
            await mysql('books').insert({
                rate, tags, author, title, image, alt, publisher, summary, price
            })
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    errMsg: '新增失败' + e.sqlMessage
                }
            }
        }
        console.log({
            rate, tags, author, title, image, alt, publisher, summary, price
        })
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData = data
            })
            res.on('end', data => {
                const bookInfo = JSON.parse(urlData)
                if (bookInfo.title) {
                    resolve(bookInfo)
                }
                reject(urlData)
            })
        })
    })
}
