<template>
  <div>
    <div class="search">
      <input class="search-input" v-model="keyword" type="text" placeholder="输入城市名或拼音">
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li class="search-item border-bottom" @click="handleCityClick(item.name)" v-for="item of list" :key="item.id">
          {{ item.name }}
        </li>
        <li class="search-item border-bottom" v-show="hasNoData">
          没有找到匹配数据
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      keyword: '',
      list: [],
      // 节流
      timer: null
    }
  },
  methods: {
    handleCityClick (city) {
      // 触发mutations中的changeCity方法
      // 第一种方式
      // this.$store.commit('changeCity', city)
      this.changeCity(city)
      this.$router.push('/')
      this.keyword = ''
    },
    // 第二种方式
    ...mapMutations(['changeCity'])
  },
  mounted () {
    // 添加滑动效果
    this.scroll = new Bscroll(this.$refs.search)
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      // 添加timer提高性能
      this.timer = setTimeout(() => {
        const result = []
        for (let key in this.cities) {
          this.cities[key].forEach(value => {
            if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  computed: {
    // 判断是否有搜索列表数据
    hasNoData () {
      return !this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
.border-bottom
  &:before
    border-color: #ccc
.search
  height: .72rem
  padding: 0 .1rem
  background: $bgColor
  .search-input
    width: 100%
    height: .62rem
    padding: 0 .1rem
    box-sizing: border-box
    line-height: .62rem
    text-align: center
    border-radius: .06rem
    color: #666
.search-content
  overflow: hidden
  position: absolute
  top: 1.58rem
  left: 0
  right: 0
  bottom: 0
  background: #eee
  z-index: 1
  .search-item
    line-height: .62rem
    padding-left: .2rem
    color: #666
    background: #fff
</style>
