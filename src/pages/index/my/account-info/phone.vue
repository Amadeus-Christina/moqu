<template>
  <div class="phone-authentication">
    <div v-if="!this.already" class="todo">
      <input type="text" class="phone" placeholder="请输入要认证的手机号码">
      <input type="text" class="code" placeholder="请输入验证码">
      <div class="send-code">获取验证码</div>
      <div class="sure" @click="changeStatus">提交</div>
    </div>
    <div v-else class="already">
      <div class="text">你已认证手机号码</div>
      <div class="phoneNum">1865****977</div>
      <div class="changeBtn" @click="changeStatus">更 换</div>
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
      already: true
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    changeStatus () {
      this.already = !this.already
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
  .phone-authentication{
    font-size: 0.32rem;
    .todo{
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      .phone{
        width: 6.9rem;
        height: 0.8rem;
        border: 1px solid #B5B5B5;
        border-radius: 0.18rem;
        margin: 0.3rem auto;
        padding-left: 0.3rem;
      }
      .code{
        width: 4.4rem;
        height: 0.8rem;
        border: 1px solid #B5B5B5;
        border-radius: 0.18rem;
        padding-left: 0.3rem;
      }
      .send-code{
        width: 2.2rem;
        height: 0.8rem;
        color: #23D2CD;
        border: 1px solid #23D2CD;
        border-radius: 0.4rem;
        line-height: 0.8rem;
        text-align: center;
      }
      .sure{
        line-height: 0.9rem;
        text-align: center;
        position: absolute;
        bottom: 0.5rem;
      }
    }
    .already{
      text-align: center;
      .text{
        color: #323232;
        font-size: 0.28rem;
        margin: 0.5rem auto;
        margin-top: 0;
        padding-top: 0.5rem;
      }
      .phoneNum{
        color: #323232;
        font-size: 0.54rem;
        margin-bottom: 0.3rem;
      }
      .changeBtn{
        width: 2.2rem;
        height: 0.8rem;
        color: #23D2CD;
        border: 1px solid #23D2CD;
        border-radius: 0.4rem;
        font-size: 0.32rem;
        line-height: 0.75rem;
        margin: 0 auto;
      }
    }
  }
</style>
