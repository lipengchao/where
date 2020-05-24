<template>
  <div>
    <city-header></city-header>
    <city-search :cities="data.cities"></city-search>
    <city-list :letter="letter" :cities="data.cities" :hotCities="data.hotCities"></city-list>
    <city-alphabet @change="handleLetterChange" :cities="data.cities"></city-alphabet>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from 'vue'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
import axios from 'axios'

export default {
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  setup() {
    const { data } = useCityLogic()
    const { letter, handleLetterChange } = useLetterLogic()
    return { 
      data,
      handleLetterChange,
      letter
    }
  }
}

function useCityLogic () {
  const data = reactive({
    cities: {},
    hotCities: [],
  })
  async function getCityInfo() {
    const { data: res } = await axios.get('/api/city.json')
    if (!res.ret) return
    data.cities = res.data.cities
    data.hotCities = res.data.hotCities
  }

  onMounted(() => {
    getCityInfo()
  })
  return { data }
}

function useLetterLogic () {
  let letter = ref('')
  // 获取字母组件传过来的值
  function handleLetterChange(selected) {
    letter.value = selected
  }
  return { letter, handleLetterChange }

}
</script>
<style lang="stylus" scoped>
</style>
