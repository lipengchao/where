<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  // 动画组件
  name: 'FadeAnimation'
}
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
  opacity: 0
.v-enter-active, .v-leave-active
  transition: opacity .5s
</style>
