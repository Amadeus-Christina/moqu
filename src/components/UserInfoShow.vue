<template>
  <div class="user-info-show" v-if="userInfo">
    <div class="myPage" v-if="userInfo.userId == viewInfo.userId">
      <div class="backgorund-img blur" :style="{backgroundImage: 'url('+viewInfo.headImg+')'}"></div>
      <div class="black"></div>
      <div class="content">
        <i class="top-right-icon setting" v-if="userInfo.userId == viewInfo.userId"></i>
        <div class="main">
          <div class="profile-group">
            <div class="profile" :style="{backgroundImage: 'url('+viewInfo.headImg+')'}"></div>
            <i class="v-icon" v-if="viewInfo.whetherMember == 2"></i>
          </div>
          <div class="username">{{viewInfo.realNickName}}({{viewInfo.anonymous}})</div>
          <div class="v-info" v-if="viewInfo.whetherMember == 2">
            <i class="v-icon-small"></i>
            {{viewInfo.identity}}
          </div>
          <div class="tag">
            <div class="gender-tag" :class="{'male' : viewInfo.sex == 1, 'female' : viewInfo.sex == 2} ">
              <i class="gender-icon" :class="{'icon-male' : viewInfo.sex == 1, 'icon-female' : viewInfo.sex == 2} "/>
              <span class="age">{{viewInfo.age}}</span>
            </div>
            <div class="constellation-tag">
              {{viewInfo.constellation}}
            </div>
          </div>
          <div class="ff">
            关注
            <span class="ffNum">{{viewInfo.attention}}</span>
            <span class="split-line">|</span>
            粉丝
            <span class="ffNum">{{viewInfo.fan}}</span>
          </div>
        </div>
      </div>
      <div class="lv-wrap" v-if="userInfo.userId == viewInfo.userId">
        <span class="lv">LV{{viewInfo.wealthGrade}}</span>
        <div class="process-bar">
          <process-bar :currentStatus="viewInfo.experienceNum" :totalStatue="viewInfo.maxExperienceNum"/>
        </div>
        <div class="split-line"></div>
        <div class="user-info" @click="$router.push('/index/accountInfo')">帐号资料</div>
      </div>
    </div>
    <div class="othersPage" v-else-if="viewInfo.userId">
      <div class="top-right-icon follow" :class="{'gray' : isFollower == true}">
        <div v-if="isFollower == false" @click="addFollow">
          <span class="follow-plus">+</span>
          <span class="text-not-follow">关注</span>
        </div>
        <div v-else @click="cancelFollow">
          <span class="text-already-follow">已关注</span>
        </div>
      </div>
      <div class="swipe">
        <van-swipe :autoplay="3000" indicator-color="#FFFFFF">
          <van-swipe-item v-for="(image, index) in album" :key="index">
            <div class="backgorund-img" :style="{backgroundImage: 'url('+image+')'}"></div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="main clear">
        <div class="profile-group left">
          <div class="profile" :style="{backgroundImage: 'url('+viewInfo.headImg+')'}"></div>
          <i class="v-icon" v-if="viewInfo.whetherMember == 2"></i>
        </div>
        <div class="content left clear">
          <div class="header clear">
            <div class="username left">{{viewInfo.realNickName}}({{viewInfo.anonymous}})</div>
            <div class="tag left">
              <div class="gender-tag" :class="{'male' : viewInfo.sex == 1, 'female' : viewInfo.sex == 2} ">
                <i class="gender-icon" :class="{'icon-male' : viewInfo.sex == 1, 'icon-female' : viewInfo.sex == 2} "/>
                <span class="age">{{viewInfo.age}}</span>
              </div>
              <div class="constellation-tag">
                {{viewInfo.constellation}}
              </div>
            </div>
          </div>
          <div class="v-info" v-if="viewInfo.whetherMember == 2">
            <i class="v-icon-small"></i>
            {{viewInfo.identity}}
          </div>
          <div class="ff">
            关注
            <span class="ffNum">{{viewInfo.attention}}</span>
            <span class="split-line">|</span>
            粉丝
            <span class="ffNum">{{viewInfo.fan}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import processBar from '@/components/ProgressBar'
import {addAttention, cancelAttention} from "@/api/my/index.js"
export default {
  components: {
    processBar
  },
  mixins: [],
  name: '',
  data () {
    return {
    }
  },
  props: ['viewInfo', 'album', 'isFollower'],
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {},
  methods: {
    //添加关注
    addFollow(){
      addAttention(this.userInfo.userId, this.viewInfo.userId).then(res => {
        if (res.code == 200) {
          // console.log('添加关注成功')
          this.$emit('changeIsFollower',true)
        } else {
          this.$toast(res.msg)
        }
      })
    },

    // 取消关注
    cancelFollow(){
      cancelAttention(this.userInfo.userId, this.viewInfo.userId).then(res => {
        if (res.code == 200) {
          // console.log('取消关注成功')
          this.$emit('changeIsFollower',false)
        } else {
          this.$toast(res.msg)
        }
      })
    }


  },
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
  .user-info-show {
    height: 7.2rem;
    position: relative;
    .myPage {
      .top-right-icon {
        position: absolute;
        right: -1.1rem;
        top: 0.4rem;
        &.setting{
          position: absolute;
          right: -1.1rem;
          top: 0.6rem;
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
          z-index: 100;
          right: 0.3rem;
          .follow-plus {
            font-size: 0.5rem;
            font-weight: 500;
            color: #ffffff;
            position: absolute;
            top: -0.1rem;
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
      .backgorund-img {
        height: 6.77rem;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        z-index: -5;
        &.blur{
          filter: blur(5px);
        }
      }
      .black{
        height: 6.77rem;
        background: #000000;
        opacity:0.4;
        position: relative;
        top: -6.77rem;
      }
      .content{
        position: absolute;
        top: 0;
        left: 2rem;
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
          /*background-image: url("/static/images/mock/03.jpg");*/
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
    .othersPage{
      .swipe{
        height: 6.77rem;
      }
      .backgorund-img {
        height: 6.77rem;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        &.blur{
          filter: blur(5px);
        }
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
          z-index: 100;
          right: 0.3rem;
          &.gray{
            background-color: #BCBCBC;
          }
          .follow-plus {
            font-size: 0.5rem;
            font-weight: 500;
            color: #ffffff;
            position: absolute;
            top: -0.1rem;
            left: 0.1rem;
          }
          .text-already-follow {
            font-size: 0.24rem;
            color: #ffffff;
            position: absolute;
            top: 0.1rem;
            right: 0.3rem;
          }
          .text-not-follow {
            font-size: 0.24rem;
            color: #FFFFFF;
            position: absolute;
            top: 0.1rem;
            right: 0.2rem;
          }
        }
      }
      .main{
        height: 2.3rem;
        /*background-color: green;*/
        .profile-group{
          width: 1.8rem;
          height: 1.8rem;
          position: relative;
          top: 0.3rem;
          left: 0.2rem;
        }
        .profile{
          width: 1.6rem;
          height: 1.6rem;
          /*background-image: url("/static/images/mock/03.jpg");*/
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
        .content{
          margin-left: 0.3rem;
          .username {
            padding-top: 0.3rem;
            font-size: 0.32rem;
            color: #41CAC0FF;
            text-align: center;
          }
        }
      }
      .tag {
        color: #ffffff;
        font-size: 0.24rem;
        text-align: center;
        margin-left: 0.5rem;
        position: relative;
        top: 0.35rem;
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
      .v-info {
        padding-top: 0.2rem;
        /*padding-bottom: 0.1rem;*/
        /*text-align: center;*/
        color: #5C5C5CFF;
        font-size: 0.24rem;
        position: relative;
        left: 0;
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
      .ff{
        padding-top: 0.1rem;
        /*text-align: center;*/
        /*vertical-align: baseline;*/
        font-family:PingFang-SC-Medium;
        color: #5C5C5CFF;
        font-size: 0.28rem;
        font-weight:500;
        .split-line{
          font-size: 0.4rem;
          margin-right: 0.1rem;
        }
        .ffNum {
          margin: 0 0.1rem;
          font-size: 0.36rem;
          /*vertical-align: baseline;*/
          font-family:PingFangSC-Semibold;
          /*font-weight:600;*/
        }
      }
    }
  }
</style>
