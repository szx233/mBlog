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
      <a-radio-group name="radioGroup" defaultValue="置顶" :options="options"></a-radio-group>
    </a-form-item>
    <a-form-item>
      <mavon-editor v-model="article.content"></mavon-editor>
    </a-form-item>
    <a-row type=flex>
      <a-col v-for="(item, index) in article.tags" :key="index" >
        <a-tag closable @close="delTag">{{item.name}}</a-tag>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
          <a-input placeholder="input tag" @keyup.enter="addTag" v-model="tag"></a-input>
      </a-col>
      <a-col :span="3" :push="14">
        <a-form-item :style="{alignText:'right'}">
          <a-button>submit</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import { mapState } from 'vuex'

const options = ['置顶', '首页显示', '标签页显示', '草稿']
export default {
  middleware:'auth',
  data() {
    return {
      form: this.$form.createForm(this, {
        onFieldsChange: (_, changedFields) => {
          this.$emit('change', changedFields)
        },
        mapPropsToFields: () => {
          return {
            tag: this.$form.createFormField({
              ...this.tag,
              value: this.tag
            })
          }
        },
        onValuesChange(_, values) {
          console.log(values)
        }
      }),
      options,
      upload: {
        url: this.$store.getters.baseUrl + '/upload-img',
        headers: {
          Token: this.$store.state.adminToken
        }
      },
      tags: [],
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
    ...mapState(['user'])
  },
  methods: {
    handleSubmit(e) {
      this.form.validateFields((err, value) => {
        if (!err) {
          console.log(value)
          this.$message.success('create success!')
        }
      })
    },
    chooseTag(tag) {
      if (this.article.tags.findIndex(item => item.name === tag.name) > -1) {
        this.$Toast({ text: '标签已存在' })
        return false
      }
      this.article.tags.push(tag)
    },
    delTag(e) {
      console.log(e)
      // this.article.tags.splice(index, 1)
    },
    addTag() {
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
            this.article.tags.push(data.data)
            this.$message.info({
              text: '标签创建完成'
            })
            this.tag = ''
          } else {
            this.$message.info({
              text: data.err
            })
          }
        })
      }
    },
    publish() {
      let tagsID = []
      if (!this.article.title || !this.article.content) {
        this.$Toast({ text: '标题和内容不能为空' })
        return false
      }
      this.article.tags.forEach(item => {
        tagsID.push(item.id)
      })
      let article = Object.assign({}, this.article, { tags: tagsID })
      if (this.article.id) {
        this.$store.dispatch('UPDATE_ARTICLE', article).then(data => {
          if (data.success) {
            this.$Toast({ text: '文章已更新' })
          }
        })
      } else {
        this.$store.dispatch('CREATE_ARTICLE', article).then(data => {
          if (data.success) {
            this.$Toast({ text: '文章创建完成' })
            this.article = {
              title: '',
              content: '',
              tags: [],
              flag: 3
            }
          }
        })
      }
    },
    save(val) {
      if (val === true) {
        // ctrl + s save article
        this.publish()
      }
    }
  },
  mounted() {
    this.$store.dispatch('TAGS').then(data => {
      this.tags = data.data
    })
    if (this.$route.params.id) {
      let id = this.$route.params.id
      this.$store.dispatch('ARTICLE_DETAIL', id).then(data => {
        this.article = data.data
      })
    }
  }
}
</script>

