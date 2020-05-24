<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconsList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>
<script>
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import { mapState } from 'vuex'
export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  data () {
    return {
      // 最后一次显示城市
      lastCity: '',
      swiperList: [],
      iconsList: [],
      recommendList: [],
      weekendList: []
    }
  },
  methods: {
    async getHomeInfo () {
      const { data: res } = await this.$http.get('/api/index.json?city=' + this.city)
      if (!res.ret) return
      this.swiperList = res.data.swiperList
      this.iconsList = res.data.iconList
      this.recommendList = res.data.recommendList
      this.weekendList = res.data.weekendList
    }
  },
  computed: {
    ...mapState(['city'])
  },
  created () {
    this.lastCity = this.city
    this.getHomeInfo()
  },
  // 使用keep-alive后会多出一个生命周期函数
  activated () {
    // 如果再一次打开这个页面当前城市和上一次显示的城市不一样则发送请求
    // 否则用缓存数据
    if (this.lastCity !== this.city) {
      this.lastCity = this.city
      this.getHomeInfo()
    }
  }
}
</script>
<style>

</style>
