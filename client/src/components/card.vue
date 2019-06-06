<template>
  <div class="card">
    <div class="cardInfo" @click="viewBookDetails(bookInfo)">
      <!--封面-->
      <div class="cardInfo-cover">
        <img :src="bookInfo.image"
             class="thumb-image"
             @click.stop="previewImg(bookInfo)"
             mode="aspectFit">
      </div>
      <!--详情-->
      <div class="cardInfo-detail">
        <div class="detail-row">
          <div class="row-left">
            <h3>图书名:{{bookInfo.title}}</h3>
            <h3 :title="bookInfo.author">作者:{{bookInfo.author}}</h3>
            <h3>出版社:{{bookInfo.publisher}}</h3>
          </div>
          <div class="row-right">
            <h3>评分:{{bookInfo.rate}} <rate :rateValue="bookInfo.rate"></rate></h3>
            <h3>浏览量:{{bookInfo.count}}</h3>
            <h3>添加人:{{bookInfo.openid}}</h3>
          </div>
        </div>
        <div class="detail-column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import rate from './rate'
export default {
  name: 'card',
  components: {
    rate
  },
  props: {
    bookInfo: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  created () {},
  methods: {
    // 查看详情
    viewBookDetails (val) {
      console.log('查看图书详情', val)
      if (val) {
        let url = '/pages/bookDetail/main?id=' + val.id
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
    },
    // 预览图片
    previewImg (val) {
      wx.previewImage({
        current: val.image,
        urls: [val.image]
      })
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.card {
  .cardInfo {
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    border-bottom: 1px solid red;
    font-size: 14px;
    cursor: pointer;
    .cardInfo-cover {
      width: 90px;
      height: 110px;
      padding-right: 10px;
      border-right: 1px solid blue;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .cardInfo-detail {
      width: 100%;
      margin-left: 4px;
      .detail-row {
        display: flex;
        justify-content: space-between;
        .row-left{
          max-width: 154px;
          text-overflow: ellipsis;
        }
        .row-right {
          max-width: 80px;
        }
      }
    }
  }
}
</style>
