<template>
  <div class="sunrise" v-if="userSunriseData">
    <van-image
      round
      width="1.6rem"
      height="1.6rem"
      fit="cover"
      :src=$store.state.userInfo.headImg
      class="head-img"
    />
    <div class="name">{{userSunriseData.realNickName}}({{userSunriseData.anonymous}})</div>
    <div class="invite-code" >
<!--      <div class="" v-if="mock.lv != 0">专属邀请码：{{mock.inviteCode}}</div>-->
    </div>
    <div class="cobber" v-if="userSunriseData.whetherDealer == 1">
      <div class="title">
        <div class="top-left">合伙人</div>
        <div class="top-right">升级可享更高返利</div>
      </div>
      <div class="promotion-num">
        <div class="text">推广人数(人)</div>
        <div class="bar">
          <van-progress
            :pivot-text="''+userSunriseData.promotionNum"
            color="linear-gradient(to right, #00C8F0, #1ED9D4)"
            :percentage="percentage"
          />
          <div class="lv">
            <div class="current">LV {{userSunriseData.grade}}</div>
            <div class="next">LV {{userSunriseData.nextGrade}}</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="rebate">{{userSunriseData.rebatePercentage}}</div>
<!--        <div class="rebate" v-else>无返利</div>-->
        <div class="learn-more" @click="$router.push('/index/sunriseLearnMore')">了解更多</div>
      </div>
    </div>
    <div class="cobber-lv0" v-else>
      <div class="title">日出联盟合伙人</div>
      <div class="content">
        升级成为合伙人可享受
        <span class="green">5%～10%</span>
        高额返利
      </div>
      <div class="start-btn" @click="add">立即开通</div>
    </div>
    <div class="gray-background">
      <div class="add-up">
        <div class="title">我的返利（钻石）</div>
        <div class="today" v-if="userSunriseData.whetherDealer == 1">
          <div class="num">{{userSunriseData.todayRebate || 0}}</div>
          <div class="text">今日返利</div>
        </div>
        <div class="month" v-if="userSunriseData.whetherDealer == 1">
          <div class="num">{{userSunriseData.monthRebate || 0}}</div>
          <div class="text">本月返利</div>
        </div>
        <div class="total" v-if="userSunriseData.whetherDealer == 1">
          <div class="num">{{userSunriseData.totalRebate || 0}}</div>
          <div class="text">总返利</div>
        </div>
        <div class="none" v-else>暂无返利，快去推广吧～</div>
      </div>
      <div class="recruit" @click="$router.push('/index/sunriseRecruit')">
        <div class="text">我的招募</div>
        <van-icon name="arrow" size="0.38rem" color="#BDC4CB"/>
      </div>
      <div class="sure" @click="showPopup">立即分享</div>
    </div>
<!--    <van-popup-->
<!--            v-model="show"-->
<!--            position="bottom"-->
<!--            :style="{ height: '3rem' }"-->
<!--    >-->
<!--      <div class="share-wrap">-->
<!--        <div class="share-content">-->
<!--          <div class="title">分享到</div>-->
<!--          <div class="share">-->
<!--            <div class="friend item" @click="shareFriend">-->
<!--              <div class="img"></div>-->
<!--              <div class="text">微信好友</div>-->
<!--            </div>-->
<!--            <div class="moments item">-->
<!--              <div class="img"></div>-->
<!--              <div class="text">微信朋友圈</div>-->
<!--            </div>-->
<!--            <div class="url item">-->
<!--              <div class="img"></div>-->
<!--              <div class="text">复制链接</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="cancel" @click="showPopup">取消</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </van-popup>-->
  </div>
</template>
<script>
import {uqueryDealerByUserId,addDealer} from '@/api/my/index.js'
import {wxConfig} from '@/api/home/index.js'
import wx from 'weixin-js-sdk'
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      userSunriseData: null,
      show: false
    }
  },
  props: {},
  computed: {
    percentage () {
      let per = ((this.userSunriseData.promotionNum-0)/((this.userSunriseData.promotionNum-0) + (this.userSunriseData.nextNum-0)))*100
      return per
    }
  },
  watch: {},
  methods: {
    showPopup() {
      this.show = !this.show;
    },
    getData () {
      uqueryDealerByUserId(this.$store.state.userInfo.userId).then(res => {
        this.userSunriseData = res.data
      })
    },
    // 开通
    add() {
      addDealer(this.$store.state.userInfo.userId).then(res => {
        this.$toast.success('开通成功')
        this.getData()
      })
    },
    // 分享给微信朋友
    shareFriend () {
      let url = window.location.href;
      wxConfig(url).then(res => {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.appId, // 必填，公众号的唯一标识
          timestamp: res.timeStamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.sign,// 必填，签名
          jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
        });
        wx.ready(function(){
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            // wx.updateAppMessageShareData({
            //   title: '陌趣社区', // 分享标题
            //   desc: '大家都爱用', // 分享描述
            //   link: 'url', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //   imgUrl: '../../../../../static/images/mock/03.jpg', // 分享图标
            //   success: function () {
            //     // 设置成功
            //     this.$toast.success('分享成功')
            //   }
            // })
            wx.onMenuShareAppMessage({
              title: '陌趣社区', // 分享标题
              desc: '健康的社区', // 分享描述
              link: testUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '../../../../../static/images/mock/03.jpg', // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: function () {
              }
            });
          });
        });
      })
    }
  },
  mounted () {
    this.getData()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .sunrise{
    /*background: #F7F7F7;*/
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    .head-img{
      margin-top: 0.8rem;
    }
    .name{
      color: #333333;
      font-size: 0.32rem;
      font-weight: 600;
      margin-top: 0.4rem;
    }
    .invite-code{
      color: #999999;
      font-size: 0.24rem;
      margin-top: 0.1rem;
      margin-bottom: 0.4rem;
      height: 0.35rem;
    }
    .cobber{
      width: 6.9rem;
      height: 2.2rem;
      background-image: url("../../../../../static/images/sunrise/background.png");
      background-repeat: no-repeat;
      background-size: 6.9rem 2.2rem;
      background-position: center;
      padding: 0.2rem;
      .title{
        display: flex;
        justify-content: space-between;
        .top-left{
          color: #FFFFFF;
          font-size: 0.32rem;
        }
        .top-right{
          color: #999999;
          font-size: 0.24rem;
        }
      }
      .promotion-num{
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        .text{
          font-size: 0.24rem;
          font-weight: 400;
          color: #FFFFFF;
        }
        .bar{
          width: 4.7rem;
          .lv{
            margin-top: 0.1rem;
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            font-size: 0.2rem;
            .current{
              color: #999999;
            }
            .next{
              color: #FFFFFF;
            }
          }
        }
      }
      .footer{
        display: flex;
        justify-content: flex-end;
        font-size: 0.24rem;
        font-weight: 400;
        margin-top: 0.1rem;
        .rebate{
          color: #ffffff;
        }
        .learn-more{
          color: #23D2CD;
          margin-left: 0.1rem;
        }
      }
    }
    .cobber-lv0{
      width: 6.9rem;
      height: 2.2rem;
      background-image: url("../../../../../static/images/sunrise/background.png");
      background-repeat: no-repeat;
      background-size: 6.9rem 2.2rem;
      background-position: center;
      padding: 0.2rem;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .title{
        font-size: 0.32rem;
        font-weight: 600;
      }
      .content{
        font-size: 0.24rem;
        font-weight: 400;
        .green{
          color: #00D6CE;
        }
      }
      .start-btn{
        width: 1.56rem;
        height: 0.5rem;
        border-radius: 0.25rem;
        background-color: #23D2CD;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.5rem;
      }
    }
    .gray-background{
      width: 100%;
      background: #F7F7F7;
      display: flex;
      flex-wrap: wrap;
      flex-grow:1;
      flex-direction: column;
    }
    .add-up{
      width: 100%;
      height: 2.43rem;
      margin-top: 0.4rem;
      margin-bottom: 0.2rem;
      color: #333333;
      font-size: 0.32rem;
      background-color: #FFFFFF;
      padding: 0.2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      .title{
        width: 100%;
        font-weight: 600;
      }
      .today,
      .month,
      .total{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        .num{
          color: #333333;
          font-size: 0.32rem;
          font-weight: 600;
        }
        .text{
          color: #999999;
          font-size: 0.24rem;
          font-weight: 400;
        }
      }
      .none{
        color: #999999;
        font-size: 0.24rem;
        font-weight: 400;
      }
    }
    .recruit{
      background-color: #FFFFFF;
      height: 1rem;
      width: 100%;
      padding: 0.3rem;
      font-size: 0.32rem;
      color: #666666;
      display: flex;
      justify-content: space-between;
    }
    .sure{
      position: absolute;
      text-align: center;
      line-height: 0.9rem;
      margin-top: 0.5rem;
      /*position: absolute;*/
      bottom: 0.5rem;
      left: 0.8rem;
    }
  }
  .share-wrap{
    display: flex;
    justify-content: center;
    background: transparent;
    .share-content{
      width: 7.1rem;
      height: 2.85rem;
      background: #ffffff;
      border-radius: 0.16rem;
      font-size: 0.24rem;
      display: flex;
      flex-direction: column;
      .title{
        height: 0.6rem;
        line-height: 0.6rem;
        padding-left: 0.2rem;
        color: #B5B5B5;
      }
      .share{
        display: flex;
        color: #B5B5B5;
        .friend{
          height: 1rem;
          width: 1rem;
        }
        .friend .img{
          background: url("../../../../../static/images/sunrise/WeChat.png");
          width: 0.7rem;
          height: 0.7rem;
          background-size: 0.7rem 0.7rem;
          background-repeat: no-repeat;
          background-position: center;
        }
        .moments .img{
          background: url("../../../../../static/images/sunrise/friends.png");
          width: 0.7rem;
          height: 0.7rem;
          background-size: 0.7rem 0.7rem;
          background-repeat: no-repeat;
          background-position: center;
        }
        .url .img{
          background: url("../../../../../static/images/sunrise/cope.png");
          width: 0.7rem;
          height: 0.7rem;
          background-size: 0.7rem 0.7rem;
          background-repeat: no-repeat;
          background-position: center;
        }
        .item{
          margin: 0.2rem 0.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          .text{
            margin-top: 0.05rem;
          }
        }
      }
      .cancel{
        width: 7.1rem;
        height: 0.8rem;
        background-color: #E3E3E3;
        font-size: 0.28rem;
        color: #FFFFFF;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0 0 0.16rem 0.16rem;
      }
    }
  }
</style>
<style lang="less">
  .sunrise{
    .van-popup--bottom{
      background-color: transparent;
    }
    .van-overlay{
      background:rgba(0,0,0,0.3);
    }
  }
</style>