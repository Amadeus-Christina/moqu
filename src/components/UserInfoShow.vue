<template>
  <div class="user-info-show">
    <div class="backgorund-img" :style="{backgroundImage: 'url('+viewInfo.profile+')'}"></div>
    <div class="content">
      <i class="top-right-icon setting" v-if="userInfo.ID == viewInfo.ID"></i>
      <div class="top-right-icon follow" v-else>
        <span class="follow-plus">+</span>
        <span class="text-follow">关注</span>
      </div>
      <div class="main">
        <div class="profile-group">
          <div class="profile" :style="{backgroundImage: 'url('+viewInfo.profile+')'}"></div>
          <i class="v-icon" v-if="viewInfo.isVip"></i>
        </div>
        <div class="username">{{viewInfo.username}}({{viewInfo.anonymousUsername}})</div>
        <div class="v-info" v-if="viewInfo.isVip">
          <i class="v-icon-small"></i>
          {{viewInfo.vipInfo}}
        </div>
        <div class="tag">
          <div class="gender-tag" :class="{'male' : viewInfo.gender === '男', 'female' : viewInfo.gender === '女'} ">
            <i class="gender-icon" :class="{'icon-male' : viewInfo.gender === '男', 'icon-female' : viewInfo.gender === '女'} "/>
            <span class="age">{{viewInfo.age}}</span>
          </div>
          <div class="constellation-tag">
            {{viewInfo.constellation}}
          </div>
        </div>
        <div class="ff">
          关注
          <span class="ffNum">{{viewInfo.follow}}</span>
          <span class="split-line">|</span>
          粉丝
          <span class="ffNum">{{viewInfo.followers}}</span>
        </div>
      </div>
    </div>
    <div class="lv-wrap" v-if="userInfo.ID == viewInfo.ID">
      <span class="lv">LV{{viewInfo.lv}}</span>
      <div class="process-bar">
        <process-bar :currentStatus="viewInfo.currentStatus" :totalStatue="viewInfo.totalStatue"/>
      </div>
      <div class="split-line"></div>
      <div class="user-info">帐号资料</div>
    </div>
  </div>
</template>
<script>
import processBar from '@/components/ProgressBar'
export default {
  components: {
    processBar
  },
  mixins: [],
  name: '',
  data () {
    return {
      userInfo: {
        ID: 13
      },
      viewInfo: {
        ID: 12,
        username: '烈烈龙',
        anonymousUsername: '敖烈',
        isVip: true,
        vipInfo: '日出联盟会长',
        gender: '女',
        age: 20,
        constellation: '处女座',
        follow: 231,
        followers: 23124,
        lv: 5,
        profile: '/static/images/mock/01.jpg',
        currentStatus: 1234,
        totalStatue: 2345
      }
    }
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
  .user-info-show {
    height: 7.2rem;
    position: relative;
    .backgorund-img {
      height: 6.77rem;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(5px);
    }
    .content{
      position: absolute;
      top: 0;
      left: 2rem;
    }
    .top-right-icon {
      position: absolute;
      right: -1.1rem;
      top: 0.4rem;
      &.setting{
        display: inline-block;
        height: 0.4rem;
        width: 0.4rem;
        background-image: url("/static/images/about-me/Setupthe.png");
        background-position: center center;
        background-size: 0.4rem 0.4rem;
        background-repeat: no-repeat;
      }
      &.follow {
        display: inline-block;
        height: 0.5rem;
        width: 1.35rem;
        border-radius: 0.3rem;
        background-color: #23D2CD;
        .follow-plus {
          font-size: 0.6rem;
          font-weight: 500;
          color: #ffffff;
          position: absolute;
          top: -0.2rem;
          left: 0.1rem;
        }
        .text-follow {
          font-size: 0.24rem;
          color: #ffffff;
          position: absolute;
          top: 0.1rem;
          right: 0.2rem;
        }
      }
    }
    .main {
      width: 4rem;
      height: 4.6rem;
      /*background-color: blue;*/
      margin: 0 auto;
      position: relative;
      top: 1.1rem;
      .profile-group{
        width: 1.8rem;
        height: 1.8rem;
        margin: 0 auto;
        position: relative;
        top: 0.2rem;
      }
      .profile{
        width: 1.6rem;
        height: 1.6rem;
        /*background-image: url("/static/images/mock/01.jpg");*/
        background-position: center center;
        background-size: 1.6rem 1.6rem;
        background-repeat: no-repeat;
        border: #ffffff 2px solid;
        border-radius: 50%;
        margin: 0 auto;
      }
      .v-icon {
        display: inline-block;
        width: 0.45rem;
        height: 0.45rem;
        background-image: url("/static/images/about-me/vip.png");
        background-size: 0.45rem 0.45rem;
        background-repeat: no-repeat;
        position: absolute;
        right: 0.1rem;
        top: 1.1rem;
      }
      .username {
        padding-top: 0.3rem;
        font-size: 0.32rem;
        color: #ffffff;
        text-align: center;
      }
      .v-info {
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        text-align: center;
        color: #ffffff;
        font-size: 0.24rem;
        .v-icon-small{
          display: inline-block;
          width: 0.28rem;
          height: 0.28rem;
          background-image: url("/static/images/about-me/vip.png");
          background-size: 0.25rem 0.25rem;
          background-repeat: no-repeat;
          position: relative;
          vertical-align: middle;
        }
      }
    }
    .tag {
      color: #ffffff;
      font-size: 0.24rem;
      text-align: center;
      .gender-tag {
        display: inline-block;
        /*margin: 0 auto;*/
        height: 0.4rem;
        width: 1rem;
        border-radius: 0.2rem;
        position: relative;
        vertical-align: middle;
        &.male{
          background-color: #41CAC0;
        }
        &.female {
          background-color: #FF648F;
        }
        .gender-icon {
          display: inline-block;
          width: 0.25rem;
          height: 0.25rem;
          background-size: 0.25rem 0.25rem;
          background-repeat: no-repeat;
          vertical-align: middle;
          line-height: 0.25rem;
          /*position: absolute;*/
          &.icon-male{
            background-image: url("/static/images/about-me/male.png");
          }
          &.icon-female {
            background-image: url("/static/images/about-me/female.png");
          }
        }
        .age {
          vertical-align: middle;
        }
      }
      .constellation-tag {
        display: inline-block;
        margin: 0 auto;
        height: 0.4rem;
        width: 1rem;
        border-radius: 0.2rem;
        position: relative;
        vertical-align: middle;
        text-align: center;
        background-color: #FFC824;
        margin-left: 0.3rem;
        line-height: 0.4rem;
      }
    }
    .ff{
      margin-top: 0.2rem;
      text-align: center;
      /*vertical-align: middle;*/
      font-family:PingFang-SC-Medium;
      color: #ffffff;
      font-size: 0.3rem;
      font-weight:500;
      .split-line{
        font-size: 0.4rem;
        margin-right: 0.1rem;
      }
      .ffNum {
        margin: 0 0.1rem;
        font-size: 0.36rem;
        vertical-align: center;
        font-family:PingFangSC-Semibold;
        /*font-weight:600;*/
      }
    }
    .lv-wrap {
      width: 6.9rem;
      height: 1.1rem;
      background-color: #ffffff;
      border-radius: 0.2rem;
      position: absolute;
      top: 5.85rem;
      left: 0.3rem;
      .lv {
        font-size: 0.36rem;
        color: #23D2CD;
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
        margin-right: 0.3rem;
        font-weight:600;
      }
      .process-bar {
        display: inline-block;
        position: absolute;
        top: 0.4rem;
        left: 1.25rem;
      }
      .split-line {
        height: 0.6rem;
        width: 0.04rem;
        background-color: #F5F5F5;
        position: absolute;
        top: 0.25rem;
        left: 4.8rem;
      }
      .user-info {
        font-size: 0.28rem;
        color: #FFFFFF;
        width: 1.55rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        background: linear-gradient(to right, #00C8F0 , #1EDAD4);
        line-height: 0.6rem;
        text-align: center;
        position: absolute;
        top: 0.25rem;
        right: 0.3rem;
      }
    }
  }
</style>
