<template>
    <div class="bookDetail">
      <!--封面-->
      <div class="bookDetail-title">
        <!--虚化背景-->
          <img class="title-backImg"
               mode="scaleToFill"
               :src="bookDetailInfo.image" alt=""/>
          <!--图片-->
          <img class="title-mainImg"
               mode="aspectFit"
               :src="bookDetailInfo.image" alt=""/>
      </div>
      <!--封面-信息-->
      <div class="title-mainText">
        <p>{{bookDetailInfo.title}}</p>
        <p>{{bookDetailInfo.author}}</p>
      </div>
      <!--其他信息-->
      <div class="bookDetail-otherInfo">
        <!--标签-->
        <div class="bookDetail-tags">
          <h3>图书标签:</h3>
          <span v-for="(item, index) in bookTags" :key="index">{{item}}</span>
        </div>
        <!--图书简介-->
        <div class="bookDetail-summary">
          <h3>图书简介:</h3>
          <p>{{bookSummary}}</p>
        </div>
      </div>
      <!--我的评论-->
      <div class="bookDetail-mycomments" v-if="commentsList.length">
        <commentsList :commentsData="commentsList"></commentsList>
      </div>
      <!--评论和手机信息-->
      <div class="bookDetail-comment" v-if="!commentsList.length">
        <!--评论-->
        <div class="comment-info">
          <textarea v-model="commentValue"
                    :bindblur="bindTextAreaBlur"
                    :maxlength="100"
                    auto-height placeholder="请输入图书短评"></textarea>
        </div>
        <!--手机信息-->
        <div class="phone-otherInfo">
          <div>
            <span>地理位置：</span>
            <switch :checked="switchLocation" @change="swLocationChange"></switch>
            <div class="geo-info" v-if="switchLocation && (locationInfo.formatted_address || locationInfo.name)">
              <p>位置详情:</p>
              <p>{{locationInfo.sematic_description}} || {{locationInfo.name}}</p>
              <p>{{locationInfo.formatted_address}} || {{locationInfo.address}}</p>
            </div>
            <div class="geo-info" v-if="switchLocation && (locationInfo.latitude || locationInfo.longitude)">
              经度:{{locationInfo.latitude}} 纬度:{{locationInfo.longitude}}
            </div>
          </div>
          <div>
            <span>手机型号：</span>
            <switch :checked="switchPhone" @change="swPhoneChange"></switch>
            <span v-if="switchPhone"
                  style="display: inline-block;padding-left: 10px; color: red;">{{phoneInfo.model}}</span>
          </div>
        </div>
      </div>
      <!--评论按钮-->
      <div class="bookDetail-commentBtn">
        <button v-if="!commentsList.length" class="btn"
                @click="submitComment">评论</button>
        <button class="btn" open-type="share">转发</button>
      </div>
      <!--触底-->
      <div class="bookDetail-noInfo">
        <p>你知道的太多了</p>
      </div>
    </div>
</template>

<script>
  import { showModal, showSuccess, get, post } from '../../utils/util'
  import commentsList from '../../components/commentsList'
  export default {
    name: 'bookDetail',
    components: {
      commentsList
    },
    data () {
      return {
        bookId: '', // 图书id
        bookDetailInfo: {}, // 图书详情
        bookTags: [], // 图书标签
        bookSummary: '', // 图书简介
        commentValue: '', // 评论
        switchLocation: false, // 地理位置开关
        switchPhone: false, // 手机型号开关
        locationInfo: {}, // 地理位置信息
        phoneInfo: {}, // 手机型号信息
        commentsList: [] // 评论列表
      }
    },
    methods: {
      // 获取详情
      async getDetail (val) {
        let param = {
          id: val
        }
        await get('/weapp/books/bookdetail', param).then((val) => {
          this.bookDetailInfo = val
          console.log('图书详情', this.bookDetailInfo)
          this.bookTags = val.tags.split('  ')
          console.log('bookTags', this.bookTags)
          this.bookSummary = val.summary.split('\n')
          // 获取评论列表
          this.getCommentList(val.id)
        }, (err) => {
          console.log('图书详情接口', err)
        }).catch(() => {

        })
        // 修改当前页标题
        wx.setNavigationBarTitle({
          title: this.bookDetailInfo.title
        })
      },
      // 地理位置
      swLocationChange (e) {
        // console.log('地理位置开关', e)
        let _this = this
        this.switchLocation = e.target.value
        if (this.switchLocation) {
          wx.getLocation({
            type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
            success (res) {
              const latitude = res.latitude
              const longitude = res.longitude
              // const location = `${latitude},${longitude}`
              // const ak = 'f6LyRow8gsa83P7fwbYycXzdKic1MnXi' // 百度地图api
              // wx.request({
              //   url: 'http://api.map.baidu.com/geocoder/v2/',
              //   data: {
              //     location,
              //     output: 'json',
              //     latest_admin: 1,
              //     ak
              //   },
              //   method: 'get',
              //   success (val) {
              //     console.log('成功', val)
              //     let tempLocationInfo = val.data.result
              //     _this.locationInfo = tempLocationInfo
              //   },
              //   fail (err) {
              //     console.log('获取失败', err)
              //   }
              // })
              wx.openLocation({
                latitude,
                longitude,
                scale: 18,
                success (res) {
                  console.log('openLocation', res)
                  wx.chooseLocation({
                    complete (val) {
                      console.log('complete', val)
                    },
                    success (val) {
                      _this.locationInfo = val
                      console.log('chooseLocation', _this.locationInfo)
                    }
                  })
                }
              })
            }
          })
        }
      },
      // 手机型号
      swPhoneChange (e) {
        console.log('手机型号开关', e.target)
        this.switchPhone = e.mp.detail.value
        if (this.switchPhone) {
          this.phoneInfo = wx.getSystemInfoSync()
          console.log('手机信息', this.phoneInfo)
        }
      },
      // 评论按钮
      async submitComment () {
        if (!this.commentValue) {
          showModal('您还没有评论', '请输入评论信息')
          return
        }
        let tempLocation = {
          name: this.locationInfo.name || this.locationInfo.sematic_description || '',
          address: this.locationInfo.address || this.locationInfo.formatted_address || '',
          latitude: this.locationInfo.latitude,
          longitude: this.locationInfo.longitude
        }
        tempLocation = JSON.stringify(tempLocation)
        let param = {
          bookid: this.bookId.id,
          booktitle: this.bookDetailInfo.title,
          openid: this.bookDetailInfo.openid,
          comment: this.commentValue,
          phoneInfo: this.phoneInfo.model,
          locationInfo: tempLocation
        }
        console.log('param', param)
        await post('/weapp/books/addcomments', param).then((res) => {
          showSuccess('评论成功')
          console.log('评论成功', res.result)
          this.commentValue = ''
          this.getCommentList(res.result)
        }, (err) => {
          console.log('评论失败', err)
          showModal('评论失败', err.errMsg)
        })
      },
      async getCommentList (val) {
        let param = {
          bookid: val
        }
        await get('/weapp/books/commentslist', param).then((res) => {
          this.commentsList = res.result
          this.commentsList.map((v, i) => {
            if (v.locationInfo) {
              v.locationInfo = JSON.parse(v.locationInfo)
            }
          })
          console.log('commentsList', this.commentsList)
        }, (err) => {
          showModal('评论列表获取失败', err.errMsg)
        })
      }
    },
    mounted () {
      this.bookId = this.$root.$mp.query
      console.log('bookId', this.bookId.id)
      // 获取详情
      this.getDetail(this.bookId.id)
      //  页面开启分享
      wx.showShareMenu({
        withShareTicket: true
      })
    }
  }
</script>

<style lang="scss" scoped>
.bookDetail{
  padding: 10px;
  .bookDetail-title {
    width: 100%;
    height: 220px;
    overflow: hidden;
    position: relative;
    .title-backImg {
      filter: blur(15px);
      width: 100%;
      height: 100%;
    }
    .title-mainImg {
        position: absolute;
        top: 4%;
        left: 36%;
        width: 100px;
        height: 130px;
    }
  }
  .title-mainText{
    width: 100%;
    max-height: 74px;
    overflow: hidden;
    position: absolute;
    top: 24%;
    text-align: center;
    color: dodgerblue;
    p {
      width: 100%;
      margin: 0 auto;
    }
  }
  .bookDetail-otherInfo {
    .bookDetail-tags {
      span {
        display: inline-block;
        padding: 2px;
        margin: 4px;
        border-radius: 4px;
        text-align: center;
        border: 1px solid aquamarine;
        color: dodgerblue;
      }
    }
    .bookDetail-summary {
      border-bottom: 1px solid blue;
      padding-bottom: 10px;
      p {
        text-indent: 2em;
        color: orange;
      }
    }
  }
  .bookDetail-mycomments {

  }
  .bookDetail-comment{
    .comment-info{
      min-height: 80px;
      margin-bottom: 4px;
      border: 1px solid royalblue;
    }
    .phone-otherInfo{
      .geo-info{
        color: red;
      }
    }
  }
  .bookDetail-commentBtn {
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
  }
  .bookDetail-noInfo{
    padding: 4px;
    text-align: center;
    border-top: 1px dashed darkorange;
    margin-top: 4px;
  }
}
</style>
