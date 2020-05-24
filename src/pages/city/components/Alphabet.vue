<template>
  <ul class="listul">
    <li
      class="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick(item)"
      v-for="item in letters"
      :key="item"
      :ref="elem => elems[item] = elem"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { computed, onUpdated, ref } from 'vue'
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  setup(props, context) {
    // 标识位(判断是否触摸该区域)
    let touchStatus = false
    // 字母A到搜索框的距离
    let startY = 0
    // 用于节流，节省handleTouchMove执行的频率
    // 从而提升性能
    let timer = null

    const elems = ref([])

    const letters = computed(() => {
      // ['A', 'B', 'C']
      const letters = []
      for (const key in props.cities) {
        letters.push(key)
      }
      return letters
    })

    onUpdated(() => {
      // 计算字母A到搜索框的距离
      // eslint-disable-next-line dot-notation
      startY = elems.value['A'].offsetTop
    })

    // 点击字母列表显示对应的城市
    function handleLetterClick (key) {
      // e.target.innerText
      // 触发父组件中change事件，并将点击的字母传过去
      context.emit('change', key)
    }

    function handleTouchStart () {
      touchStatus = true
    }

    // 滑动字母列表切换对应的城市列表
    function handleTouchMove (e) {
      if (touchStatus) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        timer = setTimeout(() => {
          // 计算触摸的位置到搜索框的距离
          // 因为clientY是到最顶部的距离所以需要减去header和搜索框的距离
          const touchY = e.touches[0].clientY - 79
          // 20 是每个字母的行高
          // index 是指字母的下标
          const index = Math.floor((touchY - startY) / 20)
          if (index >= 0 && index < letters.value.length) {
            context.emit('change', letters.value[index])
          }
        }, 16)
      }
    }

    function handleTouchEnd () {
      touchStatus = false
    }

    return {
      letters,
      elems,
      handleLetterClick,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  .listul
    position: absolute
    display: flex
    flex-direction: column
    justify-content: center
    top: 1.58rem
    right: 0
    bottom: 0
    width: .4rem
    .item
      line-height: .4rem
      text-align: center
      color: $bgColor
</style>
