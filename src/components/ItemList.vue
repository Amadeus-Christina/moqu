<template>
  <div class="message-item-group">
    <div class="message-item clear" v-for="(item,index) in itemInfo" :key="index">
      <i class="icon">
        <img class="icon-img" :src="item.iconPath" alt="图标">
      </i>
      <span class="item-name">{{item.name}}</span>
      <div class="right clear right-part">
        <span class="next right"> > </span>
        <span class="msg-num left" v-show="item.msgNum > 0">{{item.msgNum}}</span>
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
    return {}
  },
  props:
    ['itemInfo']
  ,
  computed: {
  },
  watch: {},
  methods: {},
  mounted () {
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .message-item-group {
    .icon {
      height: 0.4rem;
      width: 0.4rem;
      margin: 0 0.3rem;
      .icon-img {
        max-width: 0.4rem;
        vertical-align: middle;
        display: inline-block;
      }
    }
    .message-item {
      height: 1rem;
      width: 100%;
      font-size: 0.28rem;
      line-height: 1rem;
      color: #5C5C5C;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      background-color: #ffffff;
      border-bottom: 0.01rem solid #F5F5F5;
      .right-part{
        width: 1.1rem;
      }
      .next {
        margin-right: 0.3rem;
        transform: scale(1, 1.8);
      }
      .msg-num {
        display: flex;
        position: relative;
        width: 0.4rem;
        height: 0.4rem;
        align-items: center;
        justify-content: center;
        top: 0.35rem;
        background-color: #FD493E;
        border-radius: 50%;
        color: #ffffff;
        font-size: 0.24rem;
      }
      .moreMsg {
        width: 0.6rem;
        border-radius:28px;
      }
    }
  }
</style>
