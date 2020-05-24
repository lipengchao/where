<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">您当前所在的位置</div>
        <div class="btn-list">
          <div class="btn-wrapper">
            <div class="btn">{{ this.city }}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="btn-list">
          <div class="btn-wrapper" @click="handleCityClick(item.name)" v-for="item in hotCities" :key="item.id">
            <div class="btn">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="area" :ref="key" v-for="(item, key) in cities" :key="key">
        <div class="title border-topbottom">{{ key }}</div>
        <div class="item-list">
          <div class="item border-bottom" @click="handleCityClick(innerItem.name)" v-for="innerItem in item" :key="innerItem.id">{{ innerItem.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hotCities: Array,
    letter: String
  },
  methods: {
    handleCityClick (city) {
      // 触发mutations中的changeCity方法
      // 第一种方式
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
    },
    // 第二种方式
    ...mapMutations(['changeCity'])
  },
  computed: {
    ...mapState(['city'])
  },
  // 页面dom挂载完毕执行
  mounted () {
    // this.$nextTick(() => {
    //   if (!this.scroll) {
    //     this.scroll = new Bscroll(this.$refs.wrapper)
    //   }
    // })
    // 使用better-scroll可能会造成部分手机浏览器点击事件失效的问题
    // 使用{ mouseWheel: true, click: true, tap: true } 解决
    this.scroll = new Bscroll(this.$refs.wrapper, { mouseWheel: true, click: true, tap: true })
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.border-topbottom
  &:before
    border-color: #ccc
  &:after
    border-color: #ccc
.border-bottom
  &:before
    border-color: #ccc
.list
  overflow: hidden
  position: absolute
  top: 1.58rem
  left: 0
  right: 0
  bottom: 0
  .title
    font-size: .26rem
    line-height: .54rem
    padding-left: .2rem
    color: #666
    background: #eee
  .btn-list
    overflow: hidden
    padding: .1rem .6rem .1rem .1rem
    .btn-wrapper
      float: left
      width: 33.33%
      .btn
        margin: .1rem
        padding: .1rem 0
        text-align: center
        border: .02rem solid #ccc
        border-radius: .06rem
  .item-list
    .item
      padding-left: .2rem
      line-height: .76rem
</style>
