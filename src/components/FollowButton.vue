<template>
  <div class="follow-button" :class="{ 'green' :  (showView == 'follower') && (following == false)}">
    <span v-if = 'following === true' @click="cancelFollow">取消关注</span>
    <span v-else @click="addFollow">
        <span class="plus">+</span>
        <span class="text-not-follow">关注</span>
    </span>
  </div>
</template>
<script>
import {intercommunication, addAttention, cancelAttention} from '@/api/my/index.js'
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      following: true
    }
  },
  props: ["showView",'itemUserId'],
  computed: {},
  watch: {},
  methods: {
    // 获取关注状态
    getStatus () {
      intercommunication(this.$store.state.userInfo.userId, this.itemUserId).then(res => {
        if (res.code ==200 ){
          if (res.data == 0){
            this.following = true
          } else {
            this.following = false
          }
        }
      })
    },
    //添加关注
    addFollow(){
      addAttention(this.$store.state.userInfo.userId, this.itemUserId).then(res => {
        if (res.code == 200) {
          console.log('添加关注成功')
          this.following = !this.following
        } else {
          this.$toast(res.msg)
        }
      })
    },
    // 取消关注
    cancelFollow(){
      cancelAttention(this.$store.state.userInfo.userId, this.itemUserId).then(res => {
        if (res.code == 200) {
          console.log('取消关注成功')
          this.following = !this.following
        } else {
          this.$toast(res.msg)
        }
      })
    },
  },
  mounted () {
    this.getStatus()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {},
  updated() {
  }
}
</script>
<style scoped lang="less">
  .follow-button{
    width: 1.28rem;
    height: 0.5rem;
    background-color: #BCBCBCFF;
    border-radius: 0.25rem;
    color: #ffffff;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.5rem;
    position: relative;

    .plus {
      font-size: 0.5rem;
      font-weight: 500;
      color: #ffffff;
      position: absolute;
      top: -0.04rem;
      left: 0.1rem;
    }
    .text-not-follow {
      font-size: 0.24rem;
      color: #FFFFFF;
      position: absolute;
      right: 0.2rem;
    }
  }
  .green {
    background: #23D2CDFF;
  }
</style>
