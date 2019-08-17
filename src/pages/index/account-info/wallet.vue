<template>
  <div class="wallet">
    <div class="title">
      <div class="account-balance">
        30000 <i class="icon"></i>
      </div>
      <div class="text">账户余额</div>
    </div>
    <div class="content">
      <div class="cash-out">
        <div class="cash-out-icon"></div>
        <div class="cash-out-text">提现</div>
      </div>
      <div class="separator">|</div>
      <div class="recharge" @click="$router.push('/index/recharge')">
        <div class="recharge-icon"></div>
        <div class="recharge-text">充值</div>
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
  .wallet{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .title{
    width: 100%;
    height: 2.26rem;
    background-color: #18D6D9FF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    .account-balance{
      font-size: 0.38rem;
      color: #ffffff;
      font-weight: 600;
    }
    .icon{
      display: inline-block;
      height: 0.27rem;
      width: 0.34rem;
      background-image: url("/static/images/account-info/diamondI.png");
      background-size: 0.34rem 0.27rem;
    }
    .text {
      color: #ffffff;
      font-size: 0.24rem;
      margin-top: 0.1rem;
    }
  }
  .content{
    height: 1.4rem;
    width: 6.9rem;
    background-color: #ffffff;
    color:#18D6D9FF;
    font-size: 0.24rem;
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    border-radius: 0.2rem;
    position: relative;
    top: -0.4rem;
    box-shadow:0 -0.02rem 0.3rem 0 rgba(0,0,0,0.05);
    .cash-out-icon {
      height: 0.38rem;
      width: 0.38rem;
      background-image: url("/static/images/account-info/diamondI.png");
      background-size: 0.38rem;
      background-repeat: no-repeat;
      margin: 0 auto;
    }
    .recharge-icon{
      height: 0.38rem;
      width: 0.38rem;
      background-image: url("/static/images/account-info/diamondI.png");
      background-size: 0.38rem;
      background-repeat: no-repeat;
      margin: 0 auto;
    }
  }
</style>
