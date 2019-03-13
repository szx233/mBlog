import Vue from 'vue'
import BlogList from '../components/blog-list.vue'
import BlogComment from '../components/blog-comment.vue'
import VueMarkdown from 'vue-markdown'

const components = [
  BlogList,
  BlogComment,
]

components.forEach(component => {
  Vue.component(component.name, component)
})
