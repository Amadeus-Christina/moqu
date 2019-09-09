<template>
  <div class="wallet">
    <wallet-item
      class="wallet-item-group"
      v-for="(item,index) in findPayPlan"
      :key="index" :item="item" :index="index" :activeIndex="activeIndex"
      @changeAmount="changeAmount"
      @changeActiveIndex="changeActiveIndex"
      />
    <div class="customize" @click="showPopup">
      <div class="icon"></div>
      <div class="text">自定义</div>
    </div>
    <div class="payment-method">
      <div class="title">支付方式</div>
      <div class="wechat-payment">
        <div class="icon"></div>
        <div class="text">微信支付</div>
      </div>
    </div>
    <div class="recharge">
      <button class="sure" @click="showToastSuccess('amount')">立即充值</button>
    </div>
    <van-popup v-model="show" round>
      <div class="recharge-pop">
        <div class="title">充&nbsp;&nbsp;&nbsp;值</div>
        <div class="close" @click="showPopup"></div>
        <div class="input-group">
          <input type="number" class="input" placeholder="请输入充值金额" v-model="customizeAmount" @blur="onBlur">
          <div class="icon">￥</div>
        </div>
        <div class="confirm" @click="showToastSuccess('customizeAmount')">确 定</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import {findPayPlan, paymentOrder} from '@/api/my/index'
  import walletItem from '@/components/WalletItem'
  import wx from 'weixin-js-sdk'
  import {wxConfig} from '@/api/home/index.js'
  export default {
    components: {
      walletItem
    },
    mixins: [],
    name: '',
    data() {
      return {
        amount: 50,
        customizeAmount: null,
        show: false,
        activeIndex: 0,
        amountValue: 0,
        // wallet: [
        //   {
        //     diamondNum: 50,
        //     price: 50
        //   },
        //   {
        //     diamondNum: 100,
        //     price: 100
        //   },
        //   {
        //     diamondNum: 200,
        //     price: 200
        //   },
        //   {
        //     diamondNum: 500,
        //     price: 500
        //   },
        //   {
        //     diamondNum: 1000,
        //     price: 1000
        //   }
        // ],
        findPayPlan: {}
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      // 切换激活状态
      changeActiveIndex(Index) {
        this.activeIndex = Index
      },
      // 弹出/关闭自定义支付窗口
      showPopup() {
        this.show = !this.show;
      },
      // 修改充值金额
      changeAmount(data) {
        this.amount = data
      },
      // 充值
      showToastSuccess(from) {
        // 充值金额
        this.amountValue = 0
        if(from == 'amount') {
          this.amountValue = this.amount
        }
        if(from == 'customizeAmount'){
          this.amountValue = this.customizeAmount
        }
        let url = window.location.href;
        paymentOrder(40, this.amountValue, 0, url).then(res => {
          wx.config({
            debug: false, // 开启调试模式
            appId: res.data.configMap.appId, // 公众号的唯一标识
            timestamp: res.data.configMap.timestamp, // 生成签名的时间戳
            nonceStr: res.data.configMap.nonceStr, // 生成签名的随机串
            signature: res.data.configMap.signature, // 签名
            jsApiList: ["chooseWXPay"] // 填入需要使用的JS接口列表，这里是先声明我们要用到支付的JS接口
          });
          wx.ready(function() {
            //弹出支付窗口
            wx.chooseWXPay({
              timestamp: res.data.payMap.timeStamp, // 支付签名时间戳，
              nonceStr: res.data.payMap.nonceStr, // 支付签名随机串，不长于 32 位
              package: res.data.payMap.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=xxxx）
              signType: res.data.payMap.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.payMap.paySign, // 支付签名
              success: function(res) {
                // 支付成功后的回调函数
                this.$toast.success('支付成功')
              }
            });
          });
        })
      },
      // 充值金额只能为正整数
      onBlur() {
        let Reg = /^[1-9]\d*$/;
        if(this.customizeAmount){
          if (!Reg.test(this.customizeAmount)) {
            this.$toast.fail('请输入\n整数金额')
            this.customizeAmount = null
          }
        }
      },
      getData() {
        findPayPlan().then(res=>{
          if (res.code == 200){
            this.findPayPlan = res.data
            console.log(this.findPayPlan)
          } else {
            this.$toast(res.msg)
          }
        })
      }
    },
    mounted() {
      this.getData()
    },
    created() {
    },
    filters: {},
    directives: {},
    beforeDestroy() {
    },
    destroyed() {
    }
  }
</script>
<style scoped lang="less">
  .wallet {
    display: inline-flex;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
    align-content: flex-start;
  }
  .wallet-item-group{
    margin-left: 0.3rem;
  }
  .customize{
    width: 2.11rem;
    height: 1.84rem;
    border: 1px solid #B5B5B5FF;
    color: #B5B5B5FF;
    border-radius: 0.18rem;
    margin-left: 0.3rem;
    .icon {
      width: 0.5rem;
      height: 1.1rem;
      background-image: url("../../../../../static/images/account-info/Thecustom.png");
      background-size: 0.5rem 0.5rem;
      background-position: center center;
      background-repeat: no-repeat;
      /*display: inline-block;*/
      margin: 0 auto;
    }
    .text{
      font-size: 0.28rem;
      text-align: center;
    }
  }
  .payment-method {
    width: 5rem;
    font-size: 0.28rem;
    margin: 0.7rem 0 0.3rem 0.3rem;
    .title {
      color: #5C5C5CFF;
      margin-bottom: 0.3rem;
    }
    .wechat-payment {
      width: 2.11rem;
      height: 1.05rem;
      border: 1px solid #FFC824FF;
      border-radius: 0.18rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon{
        margin-right: 0.2rem;
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-image: url("../../../../../static/images/account-info/weixinzhifu.png");
        background-size: 0.4rem 0.4rem;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .text{
        display: inline-block;
        font-size: 0.28rem;
        color: #FFC824FF;
      }
    }
  }
  .recharge{
    margin: 0 auto;
    position: absolute;
    bottom: 0.5rem;
    left: 0.8rem;
  }
  .recharge-pop{
    width: 5.4rem;
    height: 3.05rem;
    background: #ffffff;
    .title{
      height: 0.95rem;
      border-bottom:1px solid #F5F5F5;
      color: #424242;
      font-size: 0.32rem;
      text-align: center;
      line-height: 0.95rem;
      position: relative;
    }
    .close {
      width: 0.27rem;
      height: 0.27rem;
      background-image: url("../../../../../static/images/account-info/Shutdown.png");
      background-size: 0.27rem 0.27rem;
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
    }
    .input-group {
      height: 1.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .input {
        position: relative;
        display: inline-block;
        width: 4.8rem;
        height: 0.6rem;
        padding-left: 0.1rem;
        font-size: 0.28rem;
        border: 1px solid #B5B5B5;
        border-radius: 0.18rem;
      }
      .icon {
        position: absolute;
        right: 0.4rem;
        display: inline-block;
        width: 0.72rem;
        height: 0.5rem;
        border-left: 1px solid #F5F5F5;
        font-size: 0.36rem;
        font-weight: 600;
        color: #424242;
        text-align: center;
        align-items: center;
      }
    }
    .confirm {
      width: 2rem;
      height: 0.6rem;
      background-color: #23D2CD;
      border-radius: 0.3rem;
      color: #FFFFFF;
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.6rem;
      margin: 0 auto;
    }
  }
</style>
