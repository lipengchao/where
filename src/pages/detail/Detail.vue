<template>
  <div>
    <detail-banner :sightName="sightName" :bannerImg="bannerImg" :gallaryImgs="gallaryImgs"></detail-banner>
    <detail-header></detail-header>
    <div class="content">
      <detail-list :list="categoryList"></detail-list>
    </div>
  </div>
</template>

<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  setup() {
    let sightName = ref('')
    let bannerImg = ref('')
    let gallaryImgs = ref([])
    let categoryList = ref([])

    const route = useRoute()

    async function getDetailInfo () {
        const { data: res } = await axios.get('/api/detail.json', {
          params: {
            id: route.params.id
          }
        })
        if (!res.ret) return
        const data = res.data
        sightName.value = data.sightName
        bannerImg.value = data.bannerImg
        gallaryImgs.value = data.gallaryImgs
        categoryList.value = data.categoryList
    }

    onMounted(() => {
      getDetailInfo()
    })

    return {
      sightName,
      bannerImg,
      gallaryImgs,
      categoryList
    }
  }
}
</script>

<style lang="stylus" scoped>
.content {
  height: 50rem;
}
</style>
