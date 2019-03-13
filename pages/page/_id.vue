<template>
  <section class="container">
    <div>
      <blog-list :articles="articles"/>
      <a-pagination v-model="currentPage" :total="total" @change="pageChange" />
    </div>
  </section>
</template>


<script>
import { mapState } from 'vuex'
export default {
  fetch({ store, route }) {
    return store.dispatch('ARTICLES', Number(route.params.id))
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
  computed: mapState([
    'user',
    'articles',
    'total',
    'limit',
  ]),
  methods: {
    pageChange(i) {
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

