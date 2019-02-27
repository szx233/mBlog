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
      <mavon-editor v-model="content"></mavon-editor>
    </a-form-item>
    <a-row>
      <a-col :span="8">
        <a-form-item  >
          <a-input placeholder="input tag"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="3" :push=14>
        <a-form-item :style="{alignText:'right'}">
          <a-button>submit</a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
const options = ['置顶', '首页显示', '标签页显示', '草稿']
export default {
  // middleware:'auth'
  data() {
    return {
      form: this.$form.createForm(this),
      options,
      content: ''
    }
  },
  methods: {
    handleSubmit(e) {
      this.form.validateFields((err, value) => {
        if (!err) {
          console.log(value)
          this.$message.success('create success!')
        }
      })
    }
  },
  created() {
    console.log(this.$form)
  }
}
</script>

