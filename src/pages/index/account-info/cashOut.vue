<template>
  <div class="cash-out">
    <div class="card">
      <div class="text">到账卡</div>
      <div class="wechat-wallet-icon"></div>
      <div class="wechat-wallet-text">微信钱包</div>
    </div>
    <div class="amount">
      <div class="text">提款金额</div>
      <div class="input-group">
        <input type="number" class="input" placeholder="请输入金额" v-model="amount">
        <div class="icon">￥</div>
      </div>
      <div class="explain">钻石比率10/1，当前余额为400元</div>
    </div>
    <div class="sure confirm">立即提现</div>
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
  .cash-out {
    width: 6.9rem;
    margin: 0.6rem auto;
    font-size: 0.28rem;
    color: #323232;
    .card{
      margin-bottom: 0.9rem;
      .text{
        display: inline-block;
        margin-right: 1.6rem;
      }
      .wechat-wallet-icon{
        margin-right: 0.1rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("/static/images/account-info/weixinzhifu.png");
        background-size: 0.4rem 0.4rem;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .wechat-wallet-text{
        display: inline-block;
        color: #B5B5B5;
        rline-height: 0.6rem;
      }
    }
    .amount{
      .input-group {
        height: 1.2rem;
        margin-top: 0.3rem;
        position: relative;
        .input {
          position: relative;
          display: inline-block;
          width: 6.3rem;
          height: 0.8rem;
          padding-left: 1rem;
          font-size: 0.28rem;
          border: 1px solid #B5B5B5;
          border-radius: 0.18rem;
        }
        .icon {
          position: absolute;
          left: 0.3rem;
          top: 0.15rem;
          display: inline-block;
          width: 0.72rem;
          height: 0.5rem;
          font-size: 0.36rem;
          font-weight: 600;
          color: #424242;
        }
      }
      .explain {
        color: #B5B5B5;
        font-size: 0.24rem;
      }
    }
    .confirm {
      text-align: center;
      line-height: 0.9rem;
      position: absolute;
      bottom: 1.5rem;
      left: 0.8rem;
    }
  }
</style>
