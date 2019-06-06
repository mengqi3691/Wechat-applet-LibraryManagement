<template>
	<div class="Books">
    <!--轮播图-->
    <div class="books-swiper">
      <bookSwiper :bookRankList="bookRankList"></bookSwiper>
    </div>
    <!--图书列表-->
    <div class="books-list" v-for="(book, index) in bookList" :key="book.id">
      <card :bookInfo="book"></card>
    </div>
    <!--触底-->
    <div class="books-footer" v-if="!more">
      <span class="footer-text">我也是有底线的</span>
    </div>

  </div>
</template>
<script>
  import { showModal, get } from '../../utils/util'
  import card from '../../components/card'
  import bookSwiper from '../../components/bookSwiper'
  export default {
    name: 'Books',
    components: {
      card,
      bookSwiper
    },
    data () {
      return {
        page: 0,
        more: true,
        bookList: [],
        bookRankList: []
      }
    },
    created () {},
    onShow () {
      wx.setNavigationBarTitle({
        title: '我的图书列表'
      })
    },
    onPullDownRefresh () {
      console.log('下拉刷新')
      // 获取图书列表
      this.getBookList(true)
      // 获取图书排行榜列表
      this.getBookRankList()
    },
    onReachBottom () {
      console.log('触底')
      if (!this.more) {
        return
      }
      this.page = this.page + 1
      this.getBookList(false)
    },
    methods: {
      // 获取图书列表
      async getBookList (initStatus) {
        if (initStatus) {
          this.page = 0
          this.more = true
        }
        // 添加loading
        wx.showNavigationBarLoading()
        let param = {
          page: this.page
        }
        await get('/weapp/books/booklist', param).then((val) => {
          // 获取图书排行榜列表
          this.getBookRankList()
          if (val.list.length < 5) {
            this.more = false
          }
          let setTimeOut = setTimeout(() => {
            if (initStatus) {
              this.bookList = val.list
              wx.stopPullDownRefresh()
            } else {
              this.bookList = this.bookList.concat(val.list)
            }
            // 取消loading
            wx.hideNavigationBarLoading()
            clearTimeout(setTimeOut)
          }, 0)
        }, (err) => {
          console.log('图书列表获取失败', err)
          showModal('图书列表获取失败', err.errMsg)
        })
      },
      // 获取图书排行
      async getBookRankList () {
        await get('/weapp/books/bookrank').then((val) => {
          this.bookRankList = val.list
          console.log('获取图书排行', this.bookRankList)
        }, (err) => {
          console.log('图书排行获取失败', err)
          showModal('图书排行获取失败', err.errMsg)
        })
      }
    },
    mounted () {
      // 获取图书列表
      this.getBookList(true)
    }
  }
</script>
<style lang="scss" scoped>
  .Books{
    .book-swiper {
      width: 100%;
    }
    .books-footer {
      text-align: center;
      font-size: 12px;
      margin-top: 10px;
      margin-bottom: 4px;
    }
  }
</style>
