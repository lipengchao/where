<template>
  <div 
    class="list" 
    ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">您当前所在的位置</div>
        <div class="btn-list">
          <div class="btn-wrapper">
            <div class="btn">{{ city }}</div>
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
      <div 
        class="area" 
        :ref="elem => elems[key] = elem" 
        v-for="(item, key) in cities" 
        :key="key">
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
import { useStore } from 'vuex'
import { onMounted, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'CityList',
  props: {
    cities: Object,
    hotCities: Array,
    letter: String
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const city = store.state.city
    const elems = ref({})
    const wrapper = ref(null)
    let scroll = null

    function handleCityClick (city) {
      store.commit('changeCity', city)
      router.push('/')
    }

    onMounted(() => {
      // 使用better-scroll可能会造成部分手机浏览器点击事件失效的问题
      // 使用{ mouseWheel: true, click: true, tap: true } 解决
      scroll = new Bscroll(wrapper.value, { mouseWheel: true, click: true, tap: true })
    })

    watch(() => props.letter, (letter, prevLetter) => {
      if (letter && scroll) {
        const element = elems.value[letter]
        scroll.scrollToElement(element)
      }
    })

    return {
      city,
      handleCityClick,
      elems,
      wrapper
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
