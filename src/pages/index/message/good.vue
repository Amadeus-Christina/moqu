<template>
  <div class="goods-group fillcontain">
    <message-item :messageInfo="message" :usernameTail="usernameTail"/>
  </div>
</template>
<script>
import {queryMyLikes} from '@/api/message/index.js'
import messageItem from '@/components/MessageItem.vue'
export default {
  components: {
    messageItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      message:null,
      usernameTail: '点赞了我的',
      // messageInfo: [
      //   {
      //     profilePicture: '/static/images/message/Anonymouscomments.png',
      //     username: '山鬼',
      //     anonymousUsername: '九月',
      //     usernameTail: '点赞了我的评论',
      //     content: '大兄弟很稳的',
      //     time: '1小时前'
      //   },
      //   {
      //     profilePicture: '/static/images/message/Anonymouscomments.png',
      //     username: '摸鱼',
      //     anonymousUsername: '七月',
      //     usernameTail: '点赞了我的评论',
      //     content: '大兄弟顶不住了',
      //     time: '2小时前'
      //   }
      // ],
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 获取点赞信息
    getMessage () {
      queryMyLikes(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200) {
          this.message = res.data
          // this.message = this.message.filter((item)=>{
          //   return item.user.beLikeType == '2'
          // })
          console.log(this.message)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  mounted () {
    this.getMessage()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .goods-group{
    background: #F7F7F7;
  }
</style>
