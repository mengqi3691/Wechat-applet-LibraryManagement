<template>
	<div id="Home">
    <div v-if="isShowHomePage">
      <h1>用户信息</h1>
      <div class="user-info">
        <!--头像-->
        <img :src="userInfo.avatarUrl" alt="用户头像" />
        <!--姓名-->
        <p>{{userInfo.nickName}}</p>
      </div>
      <!--进度条-->
      <div class="user-progress">
        <yearProgress :isShowYear.sync="isShowYear"></yearProgress>
      </div>
      <!--功能按钮-->
      <div class="user-btn">
        <button class="btn add-books-btn" @click="scanBook">添加图书</button>
        <button class="btn user-setting" open-type="openSetting" @opensetting="openSeting">打开授权设置页</button>
      </div>
    </div>
    <div v-else class="unauthor-wapper">
      <!--遮罩-->
      <div class="homeMask"></div>
      <!--未授权用户界面-->
      <div class="unauthor-modal">
        <h4>用户未授权</h4>
        <div class="unauthor-info">
          <!--头像-->
          <img src="../../../static/images/unauthor.jpg" alt="用户头像" />
        </div>
        <button class="btn unauthor-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="checkVersion">
          点击授权
        </button>
      </div>
    </div>
    <!--<open-data type="groupName" lang="zh_CN"></open-data>-->
  </div>
</template>
<script>
  import { showModal, showSuccess, post } from '../../utils/util'
  import yearProgress from '../../components/yearProgress'
  export default {
    name: 'Home',
    components: {
      yearProgress
    },
    data () {
      return {
        isShowYear: true,
        isShowHomePage: false, // 是否需要获取用户信息
        userInfo: {
          avatarUrl: '',
          nickName: ''
        } // 用户信息
      }
    },
    created () {},
    onShow () {
      wx.setNavigationBarTitle({
        title: '首页'
      })
    },
    methods: {
      getSetting () {
        let _this = this
        wx.getSetting({ // 查看是否授权
          success (res) {
            if (res.authSetting['scope.userInfo']) {
              console.log('用户已授权')
              wx.login({
                success (res) {
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?',
                    data: {
                      appid: 'wxfc0076f38b7c89f1',
                      secret: '2a2b3bbde84aadccedae6891cb431786',
                      js_code: res.code
                    },
                    method: 'get',
                    header: {
                      'content-type': 'application/json'
                    },
                    success (val) {
                      console.log('成功', val)
                    },
                    fail (err) {
                      console.log('失败', err)
                    }
                  })
                }
              })
              wx.getUserInfo({
                success (res) {
                  console.log('用户信息：', res)
                  _this.userInfo = res.userInfo
                  _this.isShowHomePage = true
                }
              })
            } else {
              console.log('用户未授权')
              _this.isShowHomePage = false
            }
          }
        })
      },
      checkVersion () { // 检查版本
        if (!wx.canIUse('button.open-type.getUserInfo')) {
          console.log('请升级微信版本')
        }
      },
      // 获取用户信息
      bindGetUserInfo (e) {
        if (e.mp.detail.rawData) {
          // 用户按了允许授权按钮
          console.log('用户按了允许授权按钮', e)
          showSuccess('授权成功')
          this.isShowHomePage = true
          wx.login({
            success (res) {
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?',
                data: {
                  appid: 'wxfc0076f38b7c89f1',
                  secret: '2a2b3bbde84aadccedae6891cb431786',
                  js_code: res.code
                },
                method: 'get',
                header: {
                  'content-type': 'application/json'
                },
                success (val) {
                  console.log('成功', val)
                },
                fail (err) {
                  console.log('失败', err)
                }
              })
            }
          })
          this.userInfo = e.mp.detail.userInfo
          // wx.getUserInfo({
          //   success (res) {
          //     console.log('userInfo', res)
          //   },
          //   fail (err) {
          //     console.log('失败', err)
          //   }
          // })
          // wx.setStorageSync('userInfo', e.mp.detail.rawData)
        } else {
          // 用户按了拒绝按钮
          console.log('用户按了拒绝按钮')
          this.isShowHomePage = false
        }
      },
      // 扫描图书
      scanBook () {
        let _this = this
        wx.scanCode({
          success (res) {
            console.log('扫码结果', res)
            _this.addBook(res.result)
          }
        })
      },
      // 扫码成功后添加
      async addBook (isbn) {
        let url = 'https://api.douban.com/v2/book/isbn/'
        wx.request({
          url: url + isbn,
          method: 'get',
          success (val) {
            console.log('val', val)
            if (val.statusCode === 200) {
              post('/weapp/addbook', val).then((res) => {
                console.log('添加', res)
                showSuccess('添加成功')
              }, (err) => {
                console('添加失败', err)
              })
            } else {
              showModal('豆瓣接口请求失败', val.statusCode.toString())
            }
          },
          fail (err) {
            console.log('获取图书失败', err)
          }
        })
      },
      // 用户授权设置页
      openSeting (e) {
        console.log('用户授权设置页', e)
        let authSettingInfo = e.mp.detail.authSetting
        if (authSettingInfo['scope.userInfo']) {
          this.isShowHomePage = true
        } else {
          this.isShowHomePage = false
        }
      }
    },
    mounted () {
      this.getSetting()
    }
  }
</script>
<style lang="scss" scoped>
  #Home {
    padding: 10px 30px;
    text-align: center;
    // 授权后的用户信息
    .user-info{
      img{
        width: 128px;
        height: 128px;
        border-radius: 50%;
        margin-top: 4px;
      }
    }
    .btn{
      color: #fff;
      background: red;
      margin-bottom: 10px;
      padding-left: 15px;
      border-radius: 4px;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
    .btn:active{
      background: #EA5A49;
    }
    // 未授权
    .unauthor-wapper{
      .unauthor-modal{
        position: absolute;
        top: 25%;
        left: 10%;
        width: 300px;
        height: 130px;
        margin: 0 auto;
        border-radius: 8px 8px 0 0;
        background: #f7f7f7;
        h4{
          margin-top: 10px;
          text-align: center;
        }
        .unauthor-info {
          img {
            width: 80px;
            height: 80px;
            margin-top: 10px;
          }
        }
        .unauthor-btn {
          border-radius: 0 0 8px 8px;
        }
      }
    }
    .homeMask{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .5);
      cursor: not-allowed;
    }
  }
</style>
