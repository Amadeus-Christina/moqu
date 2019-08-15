<template>
  <div class="message-goods-group">
    <message-item :messageInfo="messageInfo"/>
  </div>
</template>
<script>
import messageItem from '@/components/MessageItem.vue'
export default {
  components: {
    messageItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      messageInfo: [
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '山鬼',
          anonymousUsername: '九月',
          usernameTail: '点赞了我的评论',
          content: '大兄弟很稳的',
          time: '1小时前'
        },
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '摸鱼',
          anonymousUsername: '七月',
          usernameTail: '点赞了我的评论',
          content: '大兄弟顶不住了',
          time: '2小时前'
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  mounted () {},
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
</style>
