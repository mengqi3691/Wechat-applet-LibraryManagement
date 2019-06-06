<template>
    <div class="bookSwiper">
        <swiper indicator-dots="true"
                indicator-color="red"
                autoplay="false"
                :interval="6000"
                :duration="1000"
                circular="true">
            <div class="rank-book" v-for="(item, index) in imgUrls" :key="index">
              <swiper-item class="book-swiper">
                <img
                     mode="aspectFit"
                     v-for="(imgItem, imgIndex) in item"
                     :key="imgIndex"
                     @click="viewImgDetail(imgItem)"
                     :src="imgItem.image" alt="">
              </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
  export default {
    name: 'bookSwiper',
    props: {
      bookRankList: {
        type: Array
      }
    },
    data () {
      return {}
    },
    computed: {
      imgUrls () {
        let res = this.bookRankList
        return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
      }
    },
    methods: {
      viewImgDetail (val) {
        if (val) {
          let url = '/pages/bookDetail/main?id=' + val.id
          wx.navigateTo({
            url,
            success (val) {
              console.log('轮播页面-跳转成功', val)
            },
            fail (err) {
              console.log('轮播页面-跳转成功', err)
            }
          })
        }
      }
    },
    mounted () {}
  }
</script>

<style lang="scss" scoped>
.bookSwiper {
  border-bottom: 1px solid red;
  padding-bottom: 4px;
  .rank-book {
    display: inline-block;
    img{
      width: 106px;
      height: 120px;
      padding: 4px;
      margin-left: 10px;
      border-radius: 4px;
      box-shadow: 0 0 2px inset;
      cursor: pointer;
    }
  }
}
</style>
