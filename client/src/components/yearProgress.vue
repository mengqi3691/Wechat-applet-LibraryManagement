<template>
  <div class="yearProgress">
    <div v-if="isShowYear">
      <progress :percent="percent" show-info activeColor="red"></progress>
      <span>{{year}}已经过去了{{days}}天。</span>
    </div>
    <div>
      <button @click="changeShowYear">隐藏进度条</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'yearProgress',
    props: {
      isShowYear: {
        type: Boolean
      }
    },
    data () {
      return {
      }
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      days () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        let offset = new Date().getTime() - start.getTime()
        return parseInt(offset / 1000 / 60 / 60 / 24) + 1
      },
      percent () {
        return (this.days * 100 / this.getDayOfYear()).toFixed(2)
      }
    },
    methods: {
      isLeapYear () {
        let year = new Date().getFullYear()
        if (year % 400 === 0) {
          return true
        } else if (year % 4 === 0 && year % 100 === 0) {
          return true
        } else {
          return false
        }
      },
      getDayOfYear () {
        return this.isLeapYear() ? 366 : 365
      },
      changeShowYear () {
        this.$emit('update:isShowYear', this.isShowYear = !this.isShowYear)
      }
    }
  }
</script>

<style lang="scss" scoped>
.yearProgress {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: center;
  progress {
    margin-bottom: 10px;
  }
}
</style>
