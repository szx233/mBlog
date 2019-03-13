<template>
  <div>
    <div class="list-null" v-if="articles.length === 0">空空如也</div>
    <a-list v-else itemLayout="horizontal" :dataSource="articles">
      <template #renderItem="item">
        <nuxt-link :to="'/detail/' + item.id">
          <a-list-item>
            <a-card :title="item.title" hoverable :style="{width:'100%'}">
              <p>{{item.content|cutString(180)}}</p>
              <!-- <span>{{ item}}</span> -->
            </a-card>
          </a-list-item>
        </nuxt-link>
      </template>
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
  }
}
</script>
