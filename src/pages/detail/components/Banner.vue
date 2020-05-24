<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="this.bannerImg" alt="">
      <div class="banner-info">
        <div class="banner-title">{{ this.sightName }}</div>
        <div class="banner-number"><span class="iconfont icontupian banner-icon"></span>{{ this.gallaryImgs.length }}</div>
      </div>
    </div>
    <fade-animation>
      <common-gallary
        @close="handleGallaryClose"
        :imgs="gallaryImgs"
        v-show="showGallary"
      >
      </common-gallary>
    </fade-animation>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import FadeAnimation from 'common/fade/FadeAnimation'
export default {
  name: 'DetailBanner',
  props: {
    bannerImg: String,
    gallaryImgs: Array,
    sightName: String
  },
  data () {
    return {
      showGallary: false
    }
  },
  methods: {
    handleBannerClick () {
      this.showGallary = true
    },
    handleGallaryClose () {
      this.showGallary = false
    }
  },
  components: {
    CommonGallary,
    FadeAnimation
  }
}
</script>

<style lang="stylus" scoped>
.banner
  overflow: hidden
  position: relative
  height: 0
  padding-bottom: 55%
  .banner-img
    width: 100%
  .banner-info
    display: flex
    position: absolute
    left: 0
    right: 0
    bottom: 0
    line-height: .6rem
    color: #fff
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8))
    .banner-title
      flex: 1
      font-size: .32rem
      padding: 0 .2rem
    .banner-number
      height: .32rem
      line-height: .4rem
      margin-top: .14rem
      padding: 0 .4rem
      border-radius: .2rem
      font-size: .24rem
      backgeround: rgba(0, 0, 0, .8)
      .banner-icon
        font-size: .24rem
        margin-right: .1rem
</style>
