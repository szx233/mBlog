<template>
  <div class="admin-tags">
    <!-- <ul class="tags-list">
      <li class="list-item" v-for="(tag, index) in tags" :key="index">
        <p class="item-title">
          <nuxt-link :to="'/tags/'+tag.id">{{tag.name}}</nuxt-link>
        </p>
        <p class="item-date">{{tag.updated_at | formatDate('yyyy-MM-dd')}}</p>
        <p class="item-del"><a @click="delTag(tag)">删除</a></p>
        <p class="item-edit"><a @click="editTag(tag)">编辑</a></p>
      </li>
    </ul>-->
    <a-list :dataSource="tags" :pagination="pagination">
      <template #renderItem="tag">
        <a-list-item>
          <nuxt-link :to="'/tags/'+tag.id">
            <a-list-item-meta
              :title="tag.name"
              :description="tag.updated_at| formatDate('yyyy-MM-dd')"
            ></a-list-item-meta>
          </nuxt-link>
          <template #actions>
            <span :key="type" v-for="{type,text} in actions" @click="handleClick(type,tag)">
              <a-icon :type="type"/>
              {{text}}
            </span>
          </template>
        </a-list-item>
      </template>
    </a-list>

    <a-modal v-model="isEdit" :closable="false" @ok=edit>
      <a-input v-model="tag.name" @keyup.enter="edit"></a-input>
    </a-modal>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      tag: {},
      tags: [],
      isEdit: false,
      actions: [
        { type: 'edit', text: 'edit' },
        { type: 'delete', text: 'delete' }
      ],
      pagination: {
        onChange: page => {
          console.log(page)
        },
        pageSize: 5
      }
    }
  },
  mounted() {
    this.$store.dispatch('TAGS').then(data => {
      this.tags =JSON.parse(JSON.stringify(data.data))
    })
  },
  head() {
    return {
      title: '修改标签 - ' + this.$store.state.user.nickname
    }
  },
  methods: {
    handleClick(type, tag) {
      console.log(type)
      if (type === 'edit') {
        this.editTag(tag)
      } else if (type === 'delete') {
        this.delTag(tag)
      }
    },
    delTag(tag) {
      let _self = this
      this.$confirm({
        title: '确定删除该标签吗？',
        text: '仅删除标签，不会影响到标签下的文章',
        onOk:()=> {
          console.log(this)
          this.$store.dispatch('DELETE_TAG', tag.id).then(data => {
            if (data.success) {
              this.$message.success({ text: '标签已删除' })
              this.$store.dispatch('TAGS').then(data => {
                this.tags = data.data
              })
            }
          })
        }
      })
    },
    editTag(tag) {
      this.isEdit = true
      this.tag = tag
    },
    edit() {
      this.isEdit = false
      this.$store.dispatch('UPDATE_TAG', this.tag).then(data => {
        if (data.success) {
          this.$message.success( '标签已更新' )
          this.$store.dispatch('TAGS').then(data => {
            this.tags = data.data
          })
        }
      })
    }
  }
}
</script>
