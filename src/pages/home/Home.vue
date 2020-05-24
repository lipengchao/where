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
// Composition API （没有this）
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommend from './components/Recommend'
import HomeWeekend from './components/Weekend'
import { useStore } from 'vuex'
import { ref, reactive, computed, onMounted, onActivated } from 'vue'
import axios from 'axios'
export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  // 初始化的时候执行一次
  setup () {
    // const data = reactive({
    //   // 最后一次显示城市
    //   lastCity: '',
    //   swiperList: [],
    //   iconsList: [],
    //   recommendList: [],
    //   weekendList: []
    // })
    const swiperList = ref([])
    const iconsList = ref([])
    const recommendList = ref([])
    const weekendList = ref([])

    // vuex
    const store = useStore()

    /**
     * 计算属性
     */
    const city = computed(() => {
      return store.state.city
    })

    /**
     * 获取主页信息
     */
    async function getHomeInfo() {
      const { data: res } = await axios.get('/api/index.json?city=' + city)
      if (!res.ret) return
      // 用reactive做响应时时data.获取
      // data.swiperList = res.data.swiperList
      // data.iconsList = res.data.iconList
      // data.recommendList = res.data.recommendList
      // data.weekendList = res.data.weekendList

      // 用ref做响应时
      // 赋值时要加.value
      swiperList.value = res.data.swiperList
      iconsList.value = res.data.iconList
      recommendList.value = res.data.recommendList
      weekendList.value = res.data.weekendList
    }

    /**
     * 对应原来的mounted生命周期
     */
    onMounted(() => {
      // data.lastCity = city
      getHomeInfo()
    })

    /**
     * 对应原来的activated生命周期
     * 这个生命周期没有执行（待考证）
     * 
     */
    onActivated(() => {
      console.log(111)
      // 如果再一次打开这个页面当前城市和上一次显示的城市不一样则发送请求
      // 否则用缓存数据
      // if (data.lastCity !== city) {
      //   data.lastCity = city
      //   getHomeInfo()
      // }
    })
    // return { data }
    return {
      swiperList,
      iconsList,
      recommendList,
      weekendList
    }
  }
  // data () {
  //   return {
  //     // 最后一次显示城市
  //     lastCity: '',
  //     swiperList: [],
  //     iconsList: [],
  //     recommendList: [],
  //     weekendList: []
  //   }
  // },
  // methods: {
  //   async getHomeInfo () {
  //     const { data: res } = await axios.get('/api/index.json?city=' + this.city)
  //     if (!res.ret) return
  //     this.swiperList = res.data.swiperList
  //     this.iconsList = res.data.iconList
  //     this.recommendList = res.data.recommendList
  //     this.weekendList = res.data.weekendList
  //   }
  // },
  // computed: {
  //   ...mapState(['city'])
  // },
  // created () {
  //   this.lastCity = this.city
  //   this.getHomeInfo()
  // },
  // // 使用keep-alive后会多出一个生命周期函数
  // activated () {
  //   // 如果再一次打开这个页面当前城市和上一次显示的城市不一样则发送请求
  //   // 否则用缓存数据
  //   if (this.lastCity !== this.city) {
  //     this.lastCity = this.city
  //     this.getHomeInfo()
  //   }
  // }
}
</script>
<style>

</style>
