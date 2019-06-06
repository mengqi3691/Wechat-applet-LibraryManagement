<template>
    <div class="comments-list">
      <div class="comments-title">
        <span>我的评论:</span>
      </div>
      <div class="comments-Details" v-for="(comment, index) in commentsData"
           :key="index" @click="viewCommentsBook(comment)">
        <!--书名-->
        <div class="comments-booktitle">
          书名：{{comment.booktitle}}
        </div>
        <!--评论内容-->
        <div class="comments-content">
          {{comment.comment}}
        </div>
        <!--地址-->
        <div class="comments-address">
          <span>地址信息：{{comment.locationInfo.address || '未知地址'}}</span>
        </div>
        <!--其他-->
        <div class="comments-other">
          <p>用户名：{{comment.openid}}</p>
          <p>手机型号：{{comment.phoneInfo || '未知型号'}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'commentsList',
    data () {
      return {}
    },
    props: {
      commentsData: {
        type: Array
      },
      commentsType: {
        type: String
      }
    },
    methods: {
      viewCommentsBook (row) {
        if (this.commentsType) {
          let url = '/pages/bookDetail/main?id=' + row.bookid
          wx.navigateTo({
            url,
            success (val) {
              console.log('列表页面-跳转成功', val)
            },
            fail (err) {
              console.log('列表页面-跳转失败', err)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.comments-list {
  margin-bottom: 4px;
  .comments-title {

  }
  .comments-Details {
    background: rgba(155, 100, 25, .5);
    padding: 4px;
    border-bottom: 1px solid rebeccapurple;
    color: rebeccapurple;
    .comments-content {
      text-indent: 2em;
      background: gold;
      border-radius: 4px;
      box-shadow: 2px 2px 4px red;
    }
    .comments-address {
      margin-top: 4px;
      font-size: 16px;
    }
    .comments-other {
      font-size: 16px;
    }
  }
}
</style>
