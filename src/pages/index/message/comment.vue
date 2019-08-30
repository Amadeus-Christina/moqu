<template>
  <div class="comment-group fillcontain">
    <message-item :messageInfo="message" :usernameTail="usernameTail"/>
  </div>
</template>
<script>
import {queryCommentsMyComments} from '@/api/message/index.js'
import messageItem from '@/components/MessageItem.vue'
export default {
  components: {
    messageItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      usernameTail: '回复了我的评论',
      message: null
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 获取评论
    getComment() {
      queryCommentsMyComments(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200) {
          this.message = res.data
          console.log('msg', res.data)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getComment()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .comment-group{
    background: #F7F7F7;
  }
</style>
