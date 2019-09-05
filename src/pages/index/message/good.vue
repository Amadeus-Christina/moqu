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
