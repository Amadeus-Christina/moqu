<template>
  <div class="wishpers-group fillcontain">
    <message-item :messageInfo="message" :usernameTail="usernameTail" :isWishpers="true"/>
  </div>
</template>
<script>
import {queryMyWishpers} from '@/api/message/index.js'
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
      message: null,
      // messageInfo: [
      //   {
      //     profilePicture: '/static/images/message/Anonymouscomments.png',
      //     username: '山鬼',
      //     anonymousUsername: '九月',
      //     usernameTail: '回复了我的评论',
      //     atName: '烈烈龙',
      //     content: '大兄弟很稳的',
      //     time: '1小时前'
      //   },
      //   {
      //     profilePicture: '/static/images/message/Anonymouscomments.png',
      //     username: '摸鱼',
      //     anonymousUsername: '七月',
      //     usernameTail: '回复了我的评论',
      //     atName: '烈烈龙',
      //     content: '大兄弟很不稳',
      //     time: '2小时前'
      //   }
      // ],
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 获取悄悄话信息
    getWishpers() {
      queryMyWishpers(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200) {
          this.message = res.data
          console.log(res.data)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getWishpers()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .wishpers-group{
    background: #F7F7F7;
  }
</style>
