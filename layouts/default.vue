<template>
  <a-layout>
    <a-layout-header class="head">
      <div class="head_back" v-if="$route.params.id">
        <a-icon type="left"/>
      </div>
      <nuxt-link to="/">
        <h1 class="head_title">SZX的博客</h1>
      </nuxt-link>
      <nav class="head_nav">
        <a-input-search style="width: 200px"></a-input-search>
        <a-menu mode="horizontal" class="menu">
          <a-menu-item v-for="(item,index) in currentNavs" :key="index">
            <nuxt-link :to="item.path">{{item.name}}</nuxt-link>
          </a-menu-item>
        </a-menu>
      </nav>
    </a-layout-header>
    <a-layout-content :style="{ margin: '24px 16px 0' }">
      <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <nuxt></nuxt>
      </div>
    </a-layout-content>
    <a-layout-footer style="textAlign: center">BLOG ©2018 Created by SZX</a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      navs: [
        {
          path: '/tags',
          name: '标签'
        },
        {
          path: '/admin/posts',
          name: '新随笔'
        }
      ],
      adminNavs: [
        {
          path: '/admin/settings',
          name: '设置'
        },
        {
          path: '/admin/comments',
          name: '评论'
        },
        {
          path: '/admin/tags',
          name: '标签'
        },
        {
          path: '/admin/drafts',
          name: '草稿'
        },
        {
          path: '/admin/posts',
          name: '随笔'
        }
      ]
    }
  },
  computed: {
    currentNavs() {
      return /^admin/.test(this.$route.name) ? this.adminNavs : this.navs
    }
  }
}
</script>

<style lang="scss">
.head {
  position: relative;
  background-color: #fff;
}
.head_back,
.head_title,
.head_nav {
  display: inline-block;
}
.head_back {
  position: fixed;
  left: 15%;
}

.head_title {
  position: relative;
  left: 20%;
}
.head_nav {
  float: right;
  .menu {
    display: inline-block;
  }
}
</style>
