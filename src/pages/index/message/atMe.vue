<template>
  <div class="at-me-group fillcontain">
    <message-item :messageInfo="message" :isAtMe="true"/>
  </div>
</template>
<script>
import messageItem from '@/components/MessageItem.vue'
import {queryAtUserOrPost} from '@/api/message/index.js'
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
      ],
      atMe: null,
      message: [
        {
          "postId":4,
          "atPostId":2,
          "userId":2,
          "headImg":"https://lvyou.shouwangs.com/img/c6221c13-f3d1-4ade-82c5-b757505dbee8.jpg",
          "realNickName":"jiafeizhu",
          "value":"皮卡丘",
          "status":1,
          "postText":"请问恶趣味无群",
          "postImg":"https://lvyou.shouwangs.com/img/c6221c13-f3d1-4ade-82c5-b757505dbee8.jpg",
          'createTime': '21小时前'
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    getData () {
      queryAtUserOrPost(this.$store.state.userInfo.userId).then(res => {
        console.log(res.data);
        this.atMe = res.data
      })
    }
  },
  mounted () {
    this.getData()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .at-me-group{
    background: #F7F7F7;
  }
</style>
