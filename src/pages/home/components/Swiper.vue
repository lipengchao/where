<!--
 * @Description: 
 * @Author: 雪中无处寻
 * @Date: 2020-05-24 14:22:25
 * @LastEditTime: 2020-05-24 16:22:42
 * @LastEditors: 雪中无处寻
--> 
<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item in list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: 5000,
        // 用户操作swiper之后，是否禁止autoplay
        autoplayDisableOnInteraction: false,
        // 循环播放
        loop: true
      }
    }
  },
  computed: {
    // 判断list是否有数据
    showSwiper () {
      return this.list.length
    }
  }
}
</script>
<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
  /**
      overflow: hidden
      width: 100%
      height: 0
      padding-bottom: 26.667%

      这段代码意思是height相对于width撑开31.25%
      或者写成
      width: 100%
      height: 26.667vw 相当于视口宽度的31.25%
      但是有兼容性问题
  */
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 31.25%
    background: #eee
    .swiper-img
      width: 100%
</style>
