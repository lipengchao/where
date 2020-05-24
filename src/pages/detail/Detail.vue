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
export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data () {
    return {
      sightName: '',
      bannerImg: '',
      gallaryImgs: [],
      categoryList: []
    }
  },
  created () {
    this.getDetailInfo()
  },
  methods: {
    async getDetailInfo () {
      const { data: res } = await this.$http.get('/api/detail.json', {
        params: {
          id: this.$route.params.id
        }
      })
      if (!res.ret) return
      const data = res.data
      this.sightName = data.sightName
      this.bannerImg = data.bannerImg
      this.gallaryImgs = data.gallaryImgs
      this.categoryList = data.categoryList
    }
  },
  activated () {
    this.getDetailInfo()
  }
}
</script>

<style lang="stylus" scoped>
.content {
  height: 50rem;
}
</style>
