<template>
	<div class="userComments">
    <userCommentsList commentsType="user" :commentsData="userCommentsList"></userCommentsList>
  </div>
</template>
<script>
  import { get } from '../../utils/util'
  import userCommentsList from '../../components/commentsList'
  export default {
    name: 'userComments',
    components: {
      userCommentsList
    },
    data () {
      return {
        userCommentsList: []
      }
    },
    onShow () {
      wx.setNavigationBarTitle({
        title: '我的评论列表'
      })
    },
    onPullDownRefresh () {
      this.getUserComments()
      wx.stopPullDownRefresh()
    },
    methods: {
      async getUserComments () {
        let param = {}
        wx.showNavigationBarLoading()
        await get('/weapp/books/commentsList', param).then((res) => {
          this.userCommentsList = res.result
          console.log('userCommentsList', this.userCommentsList)
          wx.hideNavigationBarLoading()
        }, (err) => {
          console.log('获取失败', err)
          wx.hideNavigationBarLoading()
        })
      }
    },
    mounted () {
      this.getUserComments()
    }
  }
</script>
