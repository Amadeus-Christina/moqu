<template>
  <div class="message fillcontain">
    <item-list :itemInfo="messageItemList"/>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {myInformation} from "@/api/my/index.js"
import {queryAllMessage} from "@/api/message/index.js"
import itemList from '@/components/ItemList'
export default {
  components: {
    itemList
  },
  mixins: [],
  name: '',
  data () {
    return {
      messageItemList:[
        {
          name: '评论',
          iconPath: '/static/images/message/replyI.png',
          toPath: '/index/comment',
          msgNum: 0
        },
        {
          name: '@我',
          iconPath: '/static/images/message/@I.png',
          toPath: '/index/atMe',
          msgNum: 0
        },
        {
          name: '收到的赞',
          iconPath: '/static/images/message/goodII.png',
          toPath: '/index/good',
          msgNum: 0
        },
        {
          name: '悄悄话',
          iconPath: '/static/images/message/whispersI.png',
          toPath: '/index/wishpers',
          msgNum: 0
        },
        {
          name: '系统消息',
          iconPath: '/static/images/message/SystemmessageI.png',
          toPath: '/index/systemNotification',
          msgNum: 0
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    ...mapMutations([
      'SET_USER_INFO'
    ]),
    async getMyInfo () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        // loadingType: "spinner",
        message: "加载中..."
      });
      // 获取本人信息
      await myInformation(1).then(res => {
        if (res.code == 200) {
          this.SET_USER_INFO(res.data)
        } else {
          this.$toast(res.msg)
        }
      })

      await queryAllMessage(this.$store.state.userInfo.userId).then(res => {
        if (res.code == 200) {
          console.log(res.data)
          this.messageItemList[0].msgNum = res.data.commentCount
          this.messageItemList[1].msgNum = res.data.liftUpCount
          this.messageItemList[2].msgNum = res.data.likeCount
          this.messageItemList[3].msgNum = res.data.whisperCount
          this.messageItemList[4].msgNum = res.data.systemCount
        } else {
          this.$toast(res.msg)
        }
      })
      this.$toast.clear();
    }
  },
  mounted () {
    this.getMyInfo()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .message{
    background: #F7F7F7;
  }
</style>
