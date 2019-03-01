<template>
  <div>
    <div class="list-null" v-if="articles.length === 0">空空如也</div>
    <a-list v-else itemLayout="horizontal" :dataSource="articles">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :title="item.title" hoverable :style="{width:'100%'}">
          <p>{{item.content|filter}}</p>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>


<script>
export default {
  name: 'blog-list',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    filter(str) {
      if (!str) {
        return
      }
      return str.slice(0,100)+'...'
    }
  }
}
</script>
