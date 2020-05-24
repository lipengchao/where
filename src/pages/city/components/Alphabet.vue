<template>
  <ul class="list">
    <li
      class="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick(item)"
      v-for="item in letters"
      :key="item"
      :ref="item"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      // 标识位(判断是否触摸该区域)
      touchStatus: false,
      // 字母A到搜索框的距离
      startY: 0,
      // 用于节流，节省handleTouchMove执行的频率
      // 从而提升性能
      timer: null
    }
  },
  // 当页面数据更新并且完成自己渲染时候执行
  updated () {
    // 计算字母A到搜索框的距离
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    // 点击字母列表显示对应的城市
    handleLetterClick (key) {
      // e.target.innerText
      // 触发父组件中change事件，并将点击的字母传过去
      this.$emit('change', key)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    // 滑动字母列表切换对应的城市列表
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          // 计算触摸的位置到搜索框的距离
          // 因为clientY是到最顶部的距离所以需要减去header和搜索框的距离
          const touchY = e.touches[0].clientY - 79
          // 20 是每个字母的行高
          // index 是指字母的下标
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  },
  computed: {
    letters () {
      // ['A', 'B', 'C']
      const letters = []
      for (let key in this.cities) {
        letters.push(key)
      }
      return letters
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/varibles.styl';
  .list
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
