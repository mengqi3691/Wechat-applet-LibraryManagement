<script>
// import { get } from './utils/util'
// import config from './utils/config'
// import qcloud from 'wafer2-client-sdk'
// import config from './utils/config'
export default {
  async created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync('logs', logs)
    // }
    // ------------------------------------------------
    // const res = await get('/weapp/textData')
    // console.log('123', res)
    // wx.request({
    //   url: config.host + '/weapp/textData',
    //   success: function (res) {
    //     console.log('success', res)
    //   }
    // })
    // wafer2-client-sdk 登陆 这种方式已经弃用
    // https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01 查看升级方式
    // qcloud.setLoginUrl(config.loginUrl)
    // qcloud.login({
    //   success: function (userInfo) {
    //     console.log('登陆成功', userInfo)
    //   },
    //   fail: function (err) {
    //     console.log('登陆失败', err)
    //   }
    // })
    // wx.getSetting({ // 查看是否授权
    //   success (res) {
    //     console.log('res', res.authSetting)
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success (res) {
    //           console.log('用户信息：', res)
    //         }
    //       })
    //     }
    //   }
    // })
    // wx.getShareInfo({
    //   success: function (res) {
    //     console.log('成功', res)
    //   },
    //   fail: function (err) {
    //     console.log('失败', err)
    //   }
    // })
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
