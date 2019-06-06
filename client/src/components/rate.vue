<template>
    <div class="rate">
      <span>☆☆☆☆☆</span>
      <div class="rate-hollow" :style="rateWidth">★★★★★</div>
    </div>
</template>

<script>
  export default {
    name: 'rate',
    props: {
      rateValue: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      rateWidth () {
        return `width:${(this.rateValue / 2) * 9}px`
      }
    }
  }
</script>

<style lang="scss" scoped>
.rate {
  color: orange;
  display: inline-block;
  position: relative;
  .rate-hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    overflow: hidden;
  }
}
</style>
