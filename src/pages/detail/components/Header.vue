<template>
  <div>
    <router-link tag="div" to="/" class="header-abs" v-show="showAbs">
      <span class="iconfont iconfanhui back-icon"></span>
    </router-link>
    <div class="header-fixed" v-show="!showAbs" :style="opacityStyle">
      <router-link to="/">
        <span class="iconfont iconfanhui header-fixed-back"></span>
      </router-link>
      景点详情
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
export default {
  name: 'DetailHeader',
  setup() {
    let showAbs = ref(false)
    const opacityStyle = reactive({
      opacity: 0
    })

    function handleScroll () {
      // 采用兼容性写法，防止浏览器不兼容
      const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        opacityStyle.opacity = opacity
        showAbs.value = false
      } else {
        showAbs.value = true
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      showAbs,
      opacityStyle
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.header-abs
  position: absolute
  left: .2rem
  top: .2rem
  width: .8rem
  height: .8rem
  line-height: .8rem
  border-radius: .4rem
  text-align: center
  background: rgba(0, 0, 0, .8)
  .back-icon
    color: #fff
.header-fixed
  position: fixed
  z-index: 2
  top: 0
  left: 0
  right: 0
  height: $headerHeight
  line-height: $headerHeight
  text-align: center
  color: #fff
  background: $bgColor
  font-size: .32rem
  .header-fixed-back
    position: absolute
    top: 0
    left: 0
    display: block
    width: .64rem
    text-align: center
    font-size: .4rem
    color: #fff
</style>
