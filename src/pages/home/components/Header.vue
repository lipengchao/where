<template>
  <div class="header">
    <div class="header-left">
      <span class="iconfont iconfanhui back-icon"></span>
    </div>
    <div class="header-input">
      <span class="iconfont iconsousuo"></span>
      输入城市/景点/游玩
    </div>
    <router-link to="/city">
      <div class="header-right">
        <!-- 第一种方式 -->
        <!-- {{ this.$store.state.city }} -->
        <!-- 第二种方式 -->
        {{ city }}
        <!-- 练习使用vuex中getters -->
        <!-- {{ this.doubleCity }} -->
        <span class="iconfont iconjiantou arrow-icon"></span>
      </div>
    </router-link>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'HomeHeader',
  setup() {
    const store = useStore()
    const city = computed(() => {
      return store.state.city
    })
    return {city}
  }
  // computed: {
  //   ...mapState(['city']),
  //   ...mapGetters(['doubleCity'])
  // }
}
</script>
<style lang="stylus" scoped>
@import '~styles/varibles.styl';

.header {
  display: flex;
  line-height: $headerHeight;
  background: $bgColor;
  color: #fff;

  .header-left {
    float: left;
    width: 0.64rem;

    .back-icon {
      display: block;
      text-align: center;
      font-size: 0.4rem;
    }
  }

  .header-input {
    flex: 1;
    height: 0.64rem;
    line-height: 0.64rem;
    margin-top: 0.12rem;
    margin-left: 0.2rem;
    padding-left: 0.2rem;
    color: #ccc;
    background: #fff;
    border-radius: 0.1rem;
  }

  .header-right {
    float: right;
    min-width: 1.04rem;
    padding: 0 .1rem
    text-align: center;
    color: #fff
    .arrow-icon {
      margin-left: -0.04rem;
      font-size: 0.24rem;
    }
  }
}
</style>
