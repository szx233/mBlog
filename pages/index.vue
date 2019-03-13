<template>
  <section class="container">
    <div>
      <blog-list :articles="allArticles"/>
      <a-pagination v-model="currentPage" :total="total" @change="pageChange" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store, route }) {
    await store.dispatch('STICK_ARTICLES')
    await store.dispatch('ARTICLES', 1)
  },
  data() {
    return {
      currentPage: Number(this.$route.query.page) || 1
    }
  },
  head() {
    return {
      title: this.user.nickname
    }
  },
  computed: {
    ...mapState(['user', 'articles', 'stickArticles', 'total', 'limit']),
    allArticles() {
      return this.stickArticles.concat(this.articles)
    }
  },
  methods: {
    pageChange(page,pageSize){
      // console.log(page)
      this.$router.push({
        name:'page-id',
        params: {
          id: page
        }
      })
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
