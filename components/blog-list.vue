<template>
  <div>
    <a-list itemLayout="vertical" :dataSource="articles" size="large" :locale="{emptyText:'空空如也～'}" :pagination=pagination>
      <template #renderItem="item">
        <nuxt-link :to="'/detail/' + item.id">
          <a-list-item>
            <a-list-item-meta :description="item.updated_at|formatDate('yyyy-MM-dd hh:mm')">
              <span slot="title">{{item.title}}</span>
              <a-avatar
                slot="avatar"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </a-list-item-meta>
            <p :style="{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}">{{item.content}}</p>
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
  },
  data() {
    return {
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 10
      }
    }
  }
}
</script>
