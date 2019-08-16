<template>
  <div class="follow-title">
    <div class="container">
      <div class="follow" :class="{active: show=='follow'}" @click="followActive()">
        我的关注
        <div class="bar" v-show="show=='follow'"></div>
      </div>
      <div class="follower" :class="{active: show=='follower'}" @click="followerActive()">
        我的粉丝
        <div class="bar" v-show="show=='follower'"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      show: 'follow'
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 我的关注 选项卡 激活, 并发送给父组件要显示的页面
    followActive () {
      this.show = 'follow'
      this.$emit("show", this.show)
    },
    // 我的粉丝 选项卡 激活 , 并发送给父组件要显示的页面
    followerActive () {
      this.show = 'follower'
      this.$emit("show", this.show)
    }
  },
  mounted () {},
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .follow-title {
    height: 0.9rem;
    background-color: #ffffff;
    font-size: 0.28rem;
    color: #5C5C5CFF;
    text-align: center;
    .container{
      width: 7rem;
      border-bottom: 1px solid #F7F7F7FF;
      margin: 0 auto;
    }
    .follow,
    .follower {
      display: inline-block;
      line-height: 0.9rem;
      margin: 0 .45rem;
      &.active {
        color: #41CAC0FF;
      }
    }
    .bar {
      height: 0.04rem;
      width: 0.57rem;
      background-color: #41CAC0FF;
      margin: 0 auto;
      border-radius: 0.02rem;
    }
  }
</style>
