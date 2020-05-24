<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg" alt="">
      <div class="banner-info">
        <div class="banner-title">{{ sightName }}</div>
        <div class="banner-number"><span class="iconfont icontupian banner-icon"></span>{{ gallaryImgs.length }}</div>
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
import { ref } from 'vue'
export default {
  name: 'DetailBanner',
  components: {
    CommonGallary,
    FadeAnimation
  },
  props: {
    bannerImg: String,
    gallaryImgs: Array,
    sightName: String
  },
  setup() {
    let showGallary = ref(false)

    function handleBannerClick () {
      showGallary.value = true
    }

    function handleGallaryClose () {
      showGallary.value = false
    }

    return {
      showGallary,
      handleBannerClick,
      handleGallaryClose
    }
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
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .8))
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
