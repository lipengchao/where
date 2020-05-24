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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, ref, watch, computed } from 'vue'
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  setup(props) {
    let keyword = ref('')
    let list = ref([])
    let timer = null
    const search = ref(null)
    
    const store = useStore()
    const router = useRouter()

    function handleCityClick (city) {
      // 触发mutations中的changeCity方法
      store.commit('changeCity', city)
      router.push('/')
      keyword = ''
    }

    onMounted(() => {
      // 添加滑动效果
      new Bscroll(search.value)
    })

    watch(keyword, (keyword, oldKeyWord) => {
      if (timer) {
        clearTimeout(timer)
      }
      if (!keyword) {
        list.value = []
        return
      }
      // 添加timer提高性能
      timer = setTimeout(() => {
        const result = []
        for (const key in props.cities) {
          props.cities[key].forEach(value => {
            if (value.spell.indexOf(keyword) > -1 || value.name.indexOf(keyword) > -1) {
              result.push(value)
            }
          })
        }
        list.value = result
      }, 100)
    })

    const hasNoData = computed(() => {
      return !list.value.length
    })

    return {
      hasNoData,
      keyword,
      handleCityClick,
      list,
      search
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
