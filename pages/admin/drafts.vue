<template>
  <div class="admin-draft">
    <blog-list :articles="drafts" />
    <wmui-pagination 
    :limit="limit" 
    :total="total" 
    :currentPage="currentPage"
    @pageClick="pageClick"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  middleware: 'auth',
  fetch({store, route}) {
    return store.dispatch('DRAFTS', 1)
  },
  data() {
    return {
      articles: [],
      currentPage: 1
    }
  },
  mounted() {
    this.$store.dispatch('DRAFTS').then((data) => {
      this.articles = data.data
    })
  },

  head() {
    return {
      title: '草稿箱 - ' + this.user.nickname
    }
  },
  computed: {
    ...mapState([
      'user',
      'limit',
      'total',
      'drafts',
    ])
  },
  methods: {
    del(id) {
      let _self = this
      this.$Modal.confirm({
        title: '确定要删除这篇草稿吗？',
        text: '删除后不可恢复',
        onConfirm(instance) {
          _self.$store.dispatch('DELETE_ARTICLE', id).then((data) => {
            if(data.success) {
              _self.$Toast({text: '草稿已删除'})
              _self.$store.dispatch('DRAFTS').then((data) => {
                _self.articles = data.data
              })
            }
          })
          instance.open = false
        },
        onCancel(instance) {
          instance.open = false
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/posts/${id}`)
    },
    pageClick(i) {
      this.currentPage = i
      this.$store.dispatch('DRAFTS', i)
    }
  }
}

</script>

