<template>
  <div class="user-info-show" v-if="userInfo">
<!--  设置按钮  -->
    <i v-if="userInfo.userId == viewInfo.userId" class="top-right-icon setting" @click="$router.push('/index/accountSetting')"></i>
<!--    上传封面按钮  -->
    <i v-if="userInfo.userId == viewInfo.userId" class="top-right-icon picture" @click="showPopup"></i>
<!--  查看关注/粉丝按钮  -->
    <i v-if="userInfo.userId == viewInfo.userId" class="top-right-icon attention" @click="$router.push('/index/followList')"></i>
<!--  关注按钮  -->
    <div v-else class="top-right-icon follow" :class="{'gray' : isFollower == true}">
      <div v-if="isFollower == false" @click="addFollow">
        <span class="follow-plus">+</span>
        <span class="text-not-follow">关注</span>
      </div>
      <div v-else @click="cancelFollow">
        <span class="text-already-follow">已关注</span>
      </div>
    </div>
<!--  轮播图  -->
    <div class="swipe">
      <van-swipe :autoplay="3000" indicator-color="#FFFFFF">
        <div v-if="viewInfo.coverImageList.length > 0 && viewInfo.coverImage">
          <van-swipe-item v-for="(image, index) in viewInfo.coverImageList" :key="index">
            <div class="backgorund-img" :style="{backgroundImage: 'url('+image+')'}"></div>
          </van-swipe-item>
        </div>
        <div v-else>
          <van-swipe-item>
            <div class="backgorund-img default-img"></div>
          </van-swipe-item>
        </div>
      </van-swipe>
    </div>
<!--  头像  -->
    <div class="profile" :style="{backgroundImage: 'url('+viewInfo.headImg+')'}">
      <i class="v-icon" v-if="viewInfo.identity != ''"></i>
    </div>
<!--    页面信息展示-->
    <div class="page">
      <div class="group">
        <div class="username">{{viewInfo.realNickName}}({{viewInfo.anonymous}})</div>
        <div class="grade">LV{{viewInfo.grade}}</div>
        <div class="gender" :class="{'male' : viewInfo.sex == 1, 'female' : viewInfo.sex == 2} ">
          <i class="gender-icon" :class="{'icon-male' : viewInfo.sex == 1, 'icon-female' : viewInfo.sex == 2} "/>
        </div>
        <constellation-icon :constellation="viewInfo.constellation"/>
      </div>
    </div>
    <div class="blank"></div>
<!--    身份标识-->
    <div class="identity">
      <div class="vip" v-if="viewInfo.identityList.length > 0">
        <div class="vip-icon"></div>
        {{viewInfo.identityList[0]}}
      </div>
      <div class="card silver" v-if="viewInfo.cardTypeId == 1">
        <div class="icon"></div>
        银卡会员
      </div>
      <div class="card gold" v-else-if="viewInfo.cardTypeId == 2">
        <div class="icon"></div>
        金卡会员
      </div>
      <div class="card black" v-else-if="viewInfo.cardTypeId == 3">
        <div class="icon"></div>
        黑卡高级会员
      </div>
      <div class="wealth-grade" v-if="viewInfo.wealthGrade != 0">
        <div class="icon"></div>
        <div class="right-part">LV{{viewInfo.wealthGrade}}</div>
      </div>
      <div class="video-authentication"></div>
    </div>
<!--    车辆信息-->
    <div class="vehicle-group">
      <div class="vehicle" v-for="(item, index) in haveAuthenticationList" :key="index">
        <div class="logo" :style="{backgroundImage: 'url(' + item.carMedalUrl + ')'}"></div>
        {{item.carName}}{{item.carModel}} &nbsp; 车主
      </div>
    </div>
<!--    个人简介-->
    <div class="person-information">{{viewInfo.personInformation}}</div>
    <div class="footer">
      <!--  follow & follower  -->
      <div class="ff">
        关注
        <span class="ffNum">{{viewInfo.attention}}</span>
        <span class="split-line">|</span>
        粉丝
        <span class="ffNum">{{viewInfo.fan}}</span>
      </div>
      <div class="account-info-btn" @click="$router.push('/index/accountInfo')" v-if="userInfo.userId == viewInfo.userId">帐号资料</div>
    </div>
<!--    更改封面弹出层-->
    <van-popup
      class="popup"
      v-model="show"
      position="bottom"
    >
      <div class="upload" @click="$router.push('/index/coverImage')">自定义封面</div>
      <div class="cancel" @click="showPopup">取消</div>
    </van-popup>
  </div>
</template>
<script>
import {addAttention, cancelAttention} from "@/api/my/index.js"
import constellationIcon from '@/components/ConstellationIcon'
export default {
  components: {
    constellationIcon
  },
  mixins: [],
  name: '',
  data () {
    return {
      show: false,
    }
  },
  props: ['viewInfo', 'album', 'isFollower', 'haveAuthenticationList'],
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
    },
    // 封面图更改弹出层展示
    showPopup() {
      this.show = !this.show;
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
  .user-info-show{
    position: relative;
    .top-right-icon {
      display: block;
      position: absolute;
      right: -1.1rem;
      top: 0.4rem;
      z-index: 2;
      &.setting{
        display: block;
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        height: 0.5rem;
        width: 0.5rem;
        background-image: url("/static/images/about-me/Setupthe.png");
        background-position: center center;
        background-size: 0.5rem 0.5rem;
        background-repeat: no-repeat;
      }
      &.picture{
        display: block;
        position: absolute;
        right: 0.3rem;
        top: 1.1rem;
        height: 0.5rem;
        width: 0.5rem;
        background-image: url("/static/images/about-me/Theuploadpage.png");
        background-position: center center;
        background-size: 0.5rem 0.5rem;
        background-repeat: no-repeat;
      }
      &.attention{
        display: block;
        position: absolute;
        right: 0.3rem;
        top: 1.9rem;
        height: 0.5rem;
        width: 0.5rem;
        background-image: url("/static/images/about-me/Focuson.png");
        background-position: center center;
        background-size: 0.5rem 0.5rem;
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
    .swipe{
      height: 6.77rem;
      position: relative;
    }
    .backgorund-img {
      height: 6.77rem;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      &.default-img{
        background-image: url("/static/images/about-me/Mask.png");
      }
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
      position: absolute;
      top: 5.97rem;
      left: 0.3rem;
      .v-icon {
        display: inline-block;
        width: 0.36rem;
        height: 0.36rem;
        background-image: url("/static/images/about-me/vip.png");
        background-size: 0.36rem 0.36rem;
        background-repeat: no-repeat;
        position: absolute;
        right: 0;
        top: 1.1rem;
      }
    }
    .page{
      position: relative;
      .group{
        width: 5.4rem;
        height: 1rem;
        position: absolute;
        left: 2.1rem;
        display: flex;
        padding-top: 0.2rem;
      }
      .username {
        font-size: 0.32rem;
        color: #41CAC0;
        display: inline-block;
        vertical-align: bottom;
        font-weight: 600;
      }
      .grade{
        width: 0.7rem;
        height: 0.4rem;
        background-color: #23D2CD;
        color: #FFFFFF;
        border-radius: 0.2rem;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.4rem;
        margin-left: 0.2rem;
      }
      .sex{
        width: 0.4rem;
        height: 0.4rem;
        background-position: center;
        background-size: 0.4rem 0.4rem;
        background-repeat: no-repeat;
      }
      .gender {
        height: 0.4rem;
        width: 0.4rem;
        border-radius: 0.2rem;
        vertical-align: middle;
        display: flex;
        margin-left: 0.2rem;
        &.male{
          background-color: #41CAC0;
        }
        &.female {
          background-color: #FF648F;
        }
        .gender-icon {
          width: 0.4rem;
          height: 0.4rem;
          background-size: 0.25rem 0.25rem;
          background-repeat: no-repeat;
          background-position: center center;
          line-height: 0.25rem;
          justify-content: center;
          &.icon-male{
            background-image: url("/static/images/about-me/male.png");
          }
          &.icon-female {
            background-image: url("/static/images/about-me/female.png");
          }
        }
      }
    }
    .blank{
      height: 1rem;
    }
    .identity{
      display: flex;
      margin-left: 0.4rem;
      margin-bottom: 0.3rem;
      .vip{
        height: 0.4rem;
        background-color: #FFC824;
        color: #ffffff;
        border-radius: 0.07rem;
        font-size: 0.24rem;
        line-height: 0.4rem;
        padding-left: 0.4rem;
        padding-right: 0.15rem;
        position: relative;
        margin-right: 0.45rem;
        .vip-icon{
          width: 0.4rem;
          height: 0.4rem;
          background-position: center;
          background-size: 0.42rem 0.42rem;
          background-repeat: no-repeat;
          background-image: url("/static/images/about-me/vip.png");
          position: absolute;
          left: -0.1rem;
        }
      }
      .card{
        height: 0.4rem;
        width: 2.1rem;
        color: #FFFFFF;
        font-size: 0.24rem;
        display: flex;
        border-radius: 0.07rem;
        position: relative;
        margin-right: 0.3rem;
        &.silver {
          padding-left: 0.4rem;
          width: 1.56rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: linear-gradient(to right, #E6E6E6,#A9A9A9);
          .icon{
            width: 0.44rem;
            height: 0.39rem;
            background-image: url("/static/images/about-me/1.png");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            position: absolute;
            left: -0.17rem;
          }
        }
        &.gold {
          padding-left: 0.4rem;
          width: 1.56rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: linear-gradient(to right, #BEA482,#AD8755);
          .icon{
            width: 0.44rem;
            height: 0.39rem;
            background-image: url("/static/images/about-me/2.png");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            position: absolute;
            left: -0.17rem;
          }
        }
        &.black {
          padding-left: 0.3rem;
          width: 1.83rem;
          height: 0.4rem;
          line-height: 0.4rem;
          background: linear-gradient(to right, #787878,#2F2F2F);
          .icon{
            width: 0.44rem;
            height: 0.39rem;
            background-image: url("/static/images/about-me/3.png");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            position: absolute;
            left: -0.17rem;
          }
        }
      }
      .wealth-grade{
        height: 0.4rem;
        border: 1px solid #FFB624;
        border-radius: 0.2rem;
        font-size: 0.24rem;
        color: #FFFFFF;
        display: flex;
        margin-right: 0.3rem;
        border-right: none;
        .icon{
          width: 0.4rem;
          height: 0.4rem;
          background-image: url("/static/images/about-me/crown.png");
          background-position: center;
          background-size: 0.28rem 0.28rem;
          background-repeat: no-repeat;
        }
        .right-part{
          height: 0.38rem;
          line-height: 0.4rem;
          background: #FFB624;
          border-radius: 0 0.2rem 0.2rem 0;
          padding: 0 0.1rem;
        }
      }
      .video-authentication{
        height: 0.4rem;
        width: 0.4rem;
        background-image: url("/static/images/about-me/Videoauthentication.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: 0.3rem;
      }
    }
    .vehicle-group{
      display: flex;
      flex-direction: column;
      margin-left: 0.3rem;
      .vehicle{
        display: flex;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        color: #5C5C5C;
        margin-bottom: 0.2rem;
        .logo{
          height: 0.4rem;
          width: 0.4rem;
          background-position: center;
          background-repeat: no-repeat;
          background-size: contain;
          margin-right: 0.3rem;
        }
      }
    }
    .person-information{
      width: 6rem;
      margin-left: 0.3rem;
      margin-bottom: 0.2rem;
      font-size: 0.24rem;
      color: #5C5C5C;
    }
    .footer{
      display: flex;
      height: 0.6rem;
      .ff{
        margin-left: 0.3rem;
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
        }
      }
      .account-info-btn{
        width: 1.55rem;
        height: 0.6rem;
        border:1px solid #41CAC0;
        border-radius: 0.07rem;
        text-align: center;
        line-height: 0.6rem;
        color: #41CAC0;
        font-size: 0.28rem;
        position: absolute;
        right: 0.2rem;
      }
    }

    .upload{
      margin: 0 auto;
      width: 7.1rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      color: #23D2CD;
      background-color: #FFFFFF;
      font-size: 0.28rem;
      border-radius: 0.16rem 0.16rem 0 0;
    }
    .cancel{
      margin: 0 auto;
      margin-bottom: 0.2rem;
      width: 7.1rem;
      height: 0.9rem;
      text-align: center;
      line-height: 0.9rem;
      color: #FFFFFF;
      background-color: #E3E3E3;
      font-size: 0.28rem;
      border-radius: 0 0 0.16rem 0.16rem;
    }
  }
</style>
<style lang="less">
  .user-info-show{
    .van-popup--bottom{
      background-color: transparent;
    }
    .van-overlay{
      background:rgba(0,0,0,0.3);
    }
  }
</style>
