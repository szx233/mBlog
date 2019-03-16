<template>
  <!-- <div class="update-password">
      <h4>修改密码</h4>
      <input type="password" v-model="oldPassword" placeholder="输入旧密码">
      <input type="password" v-model="newPassword" placeholder="输入新密码">
      <input type="password" v-model="vertifyPassword" placeholder="再次输入新密码">
      <wmui-button className="wmui-btn-primary" @click.native="updatePassword">确认修改</wmui-button>
    </div>
  </div>-->
  <div>
    <a-form :form="form">
      <a-form-item :style="{textAlign:'center'}">
        <h3>修改个人信息</h3>
      </a-form-item>
      <a-form-item
        :style="{textAlign:'center'}"
        label="昵称"
        :labelCol="{span:5,offset:2}"
        :wrapperCol="{span:10}"
      >
        <a-input
          v-decorator="[
          'nickname',
          {rules: [{ required: true, message: 'Please input your nickname!' }]}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="签名" :labelCol="{span:5,offset:2}" :wrapperCol="{span:10}">
        <a-input
          v-decorator="[
          'motto',
          {rules: [{ required: true, message: 'Please input your motto!' }]}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="邮箱" :labelCol="{span:5,offset:2}" :wrapperCol="{span:10}">
        <a-input
          v-decorator="[
          'email',
          {rules: [{ required: true, message: 'Please input your email!' }]}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item :style="{textAlign:'center'}">
        <a-button type="primary">确认修改</a-button>
      </a-form-item>
    </a-form>
    <a-form :form="form">
      <a-form-item :style="{textAlign:'center'}">
        <h3>修改密码</h3>
      </a-form-item>
      <a-form-item label="旧密码" :labelCol="{span:5,offset:2}" :wrapperCol="{span:10}">
        <a-input
          v-decorator="[
          'oldPassword',
          {rules: [{ required: true, message: 'Please input your old password!' }]}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="新密码" :labelCol="{span:5,offset:2}" :wrapperCol="{span:10}">
        <a-input
          v-decorator="[
          'newPassword',
          {rules: [{ required: true, message: 'Please input your newpassword!' }]}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="再次确认新密码" :labelCol="{span:5,offset:2}" :wrapperCol="{span:10}">
        <a-input
          v-decorator="[
          'vertifyPassword',
          {rules: [{ required: true, message: 'password not same whth first' }]}
        ]"
        ></a-input>
      </a-form-item>

      <a-form-item :style="{textAlign:'center'}">
        <a-button type="primary" @click="updatePassword">确认修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      vertifyPassword: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  head() {
    return {
      title: '修改信息 - ' + this.user.nickname
    }
  },
  methods: {
    updateInfo() {
      this.$store.dispatch('UPDATE_ADMIN_INFO', this.user).then(data => {
        if (data.success) {
          this.$Toast({ text: '信息已修改' })
        }
      })
    },
    updatePassword() {
      this.form.validateFields((err, value) => {
        if (err) {
          console.log(err)
          return
        }
        console.log(value)
        if (value.newPassword !== value.vertifyPassword) {
          this.$message.error('两次密码不一致' )
          return false
        }
        this.$store
          .dispatch('UPDATE_ADMIN_PASSWORD', {
            oldPassword: value.oldPassword,
            newPassword: value.newPassword
          })
          .then(data => {
            console.log(data)
            if (data.success) {
              this.$message.success( '密码已重置,请重新登录' )
              // clear token
              this.$store.dispatch('LOGOUT').then(data => {
                console.log(data)
                if (data.success) {
                  this.$router.push('/login')
                }
              })
            }else{
              this.$message.error(data.err)
            }
          })
      })
    }
  },
  watch: {
    user(val) {
      this.form.setFieldsValue({ nickname: val.nickname })
      this.form.setFieldsValue({ motto: val.motto })
      this.form.setFieldsValue({ email: val.email })
    }
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit('change', changedFields)
      },
      mapPropsToFields: () => {
        return {
          nickname: this.$form.createFormField({
            value: this.user.nickname
          }),
          motto: this.$form.createFormField({
            value: this.user.motto
          }),
          email: this.$form.createFormField({
            value: this.user.email
          })
        }
      }
    })
  }
}
</script>
2