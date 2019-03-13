<template>
  <a-form :form="form" @submit.prevent="handleSubmit">
    <a-form-item :wrapper-col="{span:10,offset:7}">
      <a-input
        placeholder="title"
        v-decorator="[
          'title',
          {rules: [{ required: true, message: 'Please input title!' }]}
        ]"
      ></a-input>
    </a-form-item>
    <a-form-item>
      <a-radio-group name="radioGroup" :defaultValue="3" :options="options" v-model="article.flag"></a-radio-group>
    </a-form-item>
    <a-form-item>
      <mavon-editor v-model="article.content" :style="{height:'500px'}"></mavon-editor>
    </a-form-item>
    <a-row type="flex">
      <a-col v-for="(item, index) in article.tags" :key="item.id">
        <a-tag closable @close="delTag(index)">{{item.name}}</a-tag>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        <a-input placeholder="input tag" @keyup.enter="addTag" v-model="tag"></a-input>
      </a-col>
      <a-col :span="1" :push="0">
        <span>insert</span>
      </a-col>
      <a-col :span="4">
        <a-checkable-tag
          color="blue"
          v-for="item in tags"
          :checked="article.tags.indexOf(item)>-1"
          @change="checked=>handleChange(item,checked)"
          :key="item.id"
        >{{item.name}}</a-checkable-tag>
      </a-col>
      <a-col :span="3" :push="10">
        <a-form-item :style="{alignText:'right'}">
          <a-button @click="publish">submit</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { mapState } from 'vuex'

const options = [
  { label: '置顶', value: 0 },
  { label: '首页显示', value: 1 },
  { label: '标签页显示', value: 2 },
  { label: '草稿', value: 3 }
]
export default {
  middleware: 'auth',
  data() {
    return {
      checked: '',
      // form: this.$form.createForm(this, {
      //   onFieldsChange: (_, changedFields) => {
      //     this.$emit('change', changedFields)
      //   },
      //   mapPropsToFields: () => {
      //     return {
      //       title: this.$form.createFormField({
      //         value: this.article.title
      //       })
      //     }
      //   },
      //   onValuesChange(_, values) {
      //     console.log(values)
      //   }
      // }),
      options,
      upload: {
        url: this.$store.getters.baseUrl + '/upload-img',
        headers: {
          Token: this.$store.state.adminToken
        }
      },
      tag: '',
      article: {
        title: '',
        content: '',
        tags: [],
        flag: 3
      }
    }
  },
  computed: {
    ...mapState(['user', 'tags'])
  },
  methods: {
    handleChange(tag, checked) {
      if (this.article.tags.findIndex(item => item.name === tag.name) > -1) {
        this.$message.info({ text: '标签已存在' })
        return false
      }
      this.article.tags.push(tag)
    },
    chooseTag(tag) {
      if (this.article.tags.findIndex(item => item.name === tag.name) > -1) {
        this.$message.info({ text: '标签已存在' })
        return false
      }
      this.article.tags.push(tag)
    },
    delTag(index) {
      console.log('del')
      console.log(index)
      this.article.tags.splice(index, 1)
    },
    addTag() {
      if (this.article.tags.findIndex(item => item.name === this.tag) > -1) {
        this.$message.info('already add')
        this.tag = ''
        return
      }
      if (this.tags.findIndex(item => item.name === this.tag) > -1) {
        // add tag
        this.tags.forEach(item => {
          if (item.name === this.tag) {
            this.article.tags.push(item)
            this.tag = ''
          }
        })
      } else {
        // create tag
        this.$store.dispatch('CREATE_TAG', { name: this.tag }).then(data => {
          if (data.success) {
            // this.$store.dispatch('TAGS')
            this.article.tags.push(data.data)
            this.$message.info({
              text: '标签创建完成'
            })
            this.tag = ''
          } else {
            this.$message.error({
              text: data.err
            })
          }
        })
      }
    },
    publish() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.article.title = values.title
          let tagsID = []
          this.article.tags.forEach(item => {
            tagsID.push(item.id)
          })
          console.log(values)
          let article = Object.assign({}, this.article, { tags: tagsID })
          if (this.article.id) {
            this.$store.dispatch('UPDATE_ARTICLE', article).then(data => {
              if (data.success) {
                this.$message.info({ text: '文章已更新' })
              }
            })
          } else {
            this.$store.dispatch('CREATE_ARTICLE', article).then(data => {
              if (data.success) {
                this.$message.info({ text: '文章创建完成' })
                this.article = {
                  title: '',
                  content: '',
                  tags: [],
                  flag: 3
                }
              }
            })
          }
        }
      })
    },
    save(val) {
      if (val === true) {
        // ctrl + s save article
        this.publish()
      }
    }
  },
  mounted() {
    this.$store.dispatch('TAGS')
    if (this.$route.params.id) {
      let id = this.$route.params.id
      this.$store.dispatch('ARTICLE_DETAIL', id).then(data => {
        this.article = JSON.parse(JSON.stringify(data.data))
      })
    }
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          title: this.$form.createFormField({
            value: this.article.title
          })
        }
      },
      onValuesChange(_, values) {
        console.log(values)
      }
    })
  },
  watch: {
    article(val) {
      console.log('this.$store.state.title: ', val)
      this.form.setFieldsValue({ title: val.title })
    }
  }
}
</script>

