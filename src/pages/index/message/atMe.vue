<template>
  <div class="at-me-group">
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
          usernameTail: '在帖子中@了我',
          contentImg: '/static/images/message/whispers.png',
          time: '1小时前',
          myUsername: '小玉',
          myAnonymousUsername: '玉兔',
          comment: '可真有来世，只愿升平早奏，韶华...'
        },
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '摸鱼',
          anonymousUsername: '七月',
          usernameTail: '在帖子中@了我',
          contentImg: '/static/images/message/whispers.png',
          time: '2小时前',
          myUsername: '小玉',
          myAnonymousUsername: '玉兔',
          comment: '可真有来世，只愿升平早奏，韶华...'
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
