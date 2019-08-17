<template>
  <div class="comment">
    <div class="bg-vip-card">
      <div class="msg">陌趣社区黑卡用户最低享受5折起</div>
    </div>
    <div class="silver-card">
      <div class="card-name">银卡会员</div>
      <div class="price" v-text="price.silver"></div>
      <div class="diamond">钻石</div>
      <div class="buy" @click="showChange(price.silver)">立即购买</div>
    </div>
    <div class="rights">
      <div class="icon"></div>
      <div class="title">会员特权</div>
      <div class="rights-item-list">
        <div class="text">享受全品类VIP专享价</div>
        <div class="text">可免费观看平台直播</div>
      </div>
    </div>
    <div class="gold-card">
      <div class="card-name">金卡会员</div>
      <div class="price" v-text="price.gold"></div>
      <div class="diamond">钻石</div>
      <div class="buy" @click="showChange(price.gold)">立即购买</div>
    </div>
    <div class="rights">
      <div class="icon"></div>
      <div class="title">会员特权</div>
      <div class="rights-item-list">
        <div class="text">V级会员所有特权</div>
        <div class="text">可加入日出联盟</div>
      </div>
    </div>
    <div class="black-card">
      <div class="card-name black-card-font">黑卡会员</div>
      <div class="price black-card-font" v-text="price.black"></div>
      <div class="diamond black-card-font">钻石</div>
      <div class="buy black-card-bg" @click="showChange(price.black)">立即购买</div>
    </div>
    <div class="rights">
      <div class="icon"></div>
      <div class="title">会员特权</div>
      <div class="rights-item-list">
        <div class="text">A级会员所有特权</div>
        <div class="text">赠送10张交流卡</div>
      </div>
    </div>
    <van-popup v-model="show" round>
      <div class="buy-pop">
        <div class="header clear">
          <div class="title">购买会员</div>
          <div class="close right" @click="showChange(priceNow)"></div>
        </div>
        <div class="content">
          <div class="buy-price" v-text="priceNow"></div>
          <i class="diamond-icon"></i>
          <div class="confirm" @click="showToast">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      show: false,
      price: {
        silver: 1999,
        gold: 2999,
        black: 4999
      },
      priceNow: 1999
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 弹出/关闭弹窗
    showChange(data = 1999) {
      this.show = !this.show;
      this.priceNow = data
    },
    // 显示支付提示信息
    showToast() {
      this.showChange()
      this.$toast.success({
        message: "购买成功",
      })
      // this.$toast.fail({
      //   message: "钻石不足",
      // })
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
  .comment{
    position: relative;
  }
  .bg-vip-card{
    height: 4.2rem;
    background-image: url("/static/images/member/bg-vipCard@2x.png");
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    .msg{
      height:1rem;
      font-family: hzgb;
      line-height:1rem;
      background:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(144,144,144,1) 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      font-size: 0.4rem;
      font-weight: 900;
      position: absolute;
      top: 1.55rem;
      left: 1.05rem;
    }
  }
  .silver-card,
  .gold-card,
  .black-card{
    width: 6.9rem;
    height: 3.9rem;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: -1.6rem;
    left: 0.35rem;
    position: relative;
  }
  .silver-card{
    background-image: url("/static/images/member/v-card@2x.png");
  }
  .gold-card{
    background-image: url("/static/images/member/a-card@2x.png");
  }
  .black-card {
    background-image: url("/static/images/member/s-card@2x.png");
  }
  .card-name,
  .diamond{
    font-size: 0.5rem;
    font-weight: 600;
    color: #8F5D20FF;
    position: absolute;
    left: 0.5rem;
  }
  .card-name{
    top: 0.6rem;
  }
  .diamond {
    top: 2.85rem;
  }
  .price {
    font-size: 0.9rem;
    font-weight: 600;
    color: #8F5D20FF;
    position: absolute;
    top: 1.7rem;
    left: 0.5rem;
  }
  .buy {
    width: 1.8rem;
    height: 0.6rem;
    border-radius: 0.3rem;
    color: #FFFFFF;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.6rem;
    position: absolute;
    right: 0.5rem;
    bottom: 0.6rem;
    background: linear-gradient(to right, #B28B5CFF , #905F22FF);
  }
  .rights {
    height: 2.5rem;
    position: relative;
    top: -1.5rem;
    .icon {
      width: 0.5rem;
      height: 0.37rem;
      background-image: url("/static/images/member/vippage@2x.png");
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      margin: 0 auto;
      margin-top: 0.2rem;
    }
    .title {
      font-size: 0.3rem;
      font-weight: 600;
      color: #8F5D20FF;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    .text {
      font-size: 0.28rem;
      font-weight: 500;
      color: #8F5D20FF;
      text-align: center;
      letter-spacing: 2px;
    }
  }
  .black-card-font {
    color: #AFAFAFFF;
  }
  .black-card-bg {
    background: linear-gradient(to right, #8E8E8EFF , #656565FF);
  }
  .buy-pop {
    width: 5.4rem;
    height: 3.15rem;
    background-color: #FFFFFF;
    font-size: 0.32rem;
    text-align: center;
    .header{
      /*background-color: #FD493E;*/
      width: 5.20rem;
      height: 1rem;
      line-height: 1rem;
      margin: 0 auto;
      position: relative;
      border-bottom: 0.01rem solid #FAFAFAFF;
      .title {
        display: inline-block;
      }
      .close {
        height: 0.27rem;
        width: 0.27rem;
        background-image: url("/static/images/member/Shutdown.png");
        background-size: 0.27rem 0.27rem;
        position: absolute;
        right: 0.15rem;
        top: 0.35rem;
      }
    }
    .content {
      height: 2.2rem;
      .buy-price{
        margin-top: 0.35rem;
        display: inline-block;
      }
      .diamond-icon{
        display: inline-block;
        width: 0.32rem;
        height: 0.28rem;
        background-image: url("/static/images/member/diamondI.png");
        background-size: 0.32rem 0.28rem;
      }
      .confirm {
        width: 2rem;
        height: 0.6rem;
        color: #ffffff;
        background-color: #23D2CDFF;
        border-radius: 0.3rem;
        line-height: 0.6rem;
        margin: 0 auto;
        margin-top: 0.5rem;
      }
    }
  }
</style>
