<template>
  <div id="app">
    <!-- keep-alive 将数据缓存下来 -->
    <!-- Detail页面不做缓存 exclude="Detail" -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
