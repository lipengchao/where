<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list :letter="letter" :cities="cities" :hotCities="hotCities"></city-list>
    <city-alphabet @change="handleLetterChange" :cities="cities"></city-alphabet>
  </div>
</template>
<script>
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
export default {
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  created () {
    this.getCityInfo()
  },
  methods: {
    async getCityInfo () {
      const { data: res } = await this.$http.get('/api/city.json')
      if (!res.ret) return
      this.cities = res.data.cities
      this.hotCities = res.data.hotCities
    },
    // 获取字母组件传过来的值
    handleLetterChange (letter) {
      this.letter = letter
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
