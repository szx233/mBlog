<template>
  <section class="container">
    <div>
      <blog-list :articles="allArticles"/>
      <a-pagination v-model="currentPage" :total="total" />
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
      currentPage: Number(this.$route.params.id) || 1
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
    pageClick(i) {
      this.$router.push({
        name: 'page-id',
        params: {
          id: i
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
