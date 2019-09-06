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
      <div class="sure">立即分享</div>
    </div>
  </div>
</template>
<script>
import {uqueryDealerByUserId,addDealer} from '@/api/my/index.js'
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      // mock:{
      //   headImg:'/static/images/mock/01.jpg',
      //   realNickName: '烈烈龙',
      //   anonymous: '敖烈',
      //   inviteCode: 121212,
      //   lv: 2,
      //   personNum: 21,
      //   rebate: 5,
      //   today: 12,
      //   month: 6666.00,
      //   total: 10101.00,
      //   percentage: 60
      // },
      userSunriseData: null
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
      background-image: url("/static/images/sunrise/background.png");
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
      background-image: url("/static/images/sunrise/background.png");
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
      text-align: center;
      line-height: 0.9rem;
      /*margin-top: 0.5rem;*/
      position: absolute;
      bottom: 1.5rem;
      left: 0.8rem;
    }
  }
</style>
