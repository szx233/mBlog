<template>
  <div class="detail">
    <h1 class="detail-title">title:{{ articleDetail.title }}</h1>
    <div class="detail-content">
      <mavon-editor :value='articleDetail.content' :toolbarsFlag=false :editable=false defaultOpen='preview' :subfield=false></mavon-editor>
    </div>
    <p class="detail-tags">
      <a-tag color="#108ee9" v-for="(tag, index) in articleDetail.tags" :key="index">
        <nuxt-link :to="'/tags/' + tag.id"># {{ tag.name }}</nuxt-link>
      </a-tag>
    </p>
    <div class="detail-admin">
      <p>发布于 {{ articleDetail.created_at | formatDate('yyyy-MM-dd') }}</p>
      <p>更新于 {{ articleDetail.updated_at | formatDate('yyyy-MM-dd') }}</p>
      <p>浏览{{ articleDetail.views }}次</p>
      <p class="admin-del" v-if="adminToken">
        <a-popconfirm
          title="确定要删除该文章吗？"
          okText="yes"
          cancelText="no"
          arrowPointAtCenter
          @confirm="del(articleDetail.id)"
          :overlayStyle="{zIndex:1500}"
        >
          <a>删除</a>
        </a-popconfirm>
      </p>
      <p class="admin-edit" v-if="adminToken">
        <a @click="edit(articleDetail.id)">编辑</a>
      </p>
    </div>
    <div v-if="app.isGithubConfig">
      <!-- <blog-comment :comment-list="articleDetail.comments" :article-id="articleDetail.id"/> -->
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { cutString } from '~/plugins/filters'

export default {
  fetch({ store, route }) {
    let id = route.params.id || ''
    return store.dispatch('ARTICLE_DETAIL', route.params.id || '')
  },
  head() {
    return {
      title: `${this.articleDetail.title} - ${this.user.nickname}`,
      meta: [{ description: cutString(this.articleDetail.content, 300) }]
    }
  },
  computed: {
    ...mapState(['user', 'adminToken', 'articleDetail', 'app'])
  },
  methods: {
    del(id) {
      this.$store.dispatch('DELETE_ARTICLE', id).then(data => {
        if (data.success) {
          console.log(data)
          this.$message.success('删除成功！')
          this.$router.go(-1)
        }
      })
    },
    edit(id) {
      this.$router.push(`/admin/posts/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  .detail-content{
    position: relative;
    overflow: auto;
  }
  .detail-admin {
    display: flex;
    p {
      margin-right: 1rem;
    }
  }
}
</style>

