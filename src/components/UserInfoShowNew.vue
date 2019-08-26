<template>
  <div class="user-info-show">
<!--  设置按钮  -->
    <i v-if="userInfo.userId == viewInfo.userId" class="top-right-icon setting"></i>
<!--  上传封面按钮  -->
    <i v-if="userInfo.userId == viewInfo.userId" class="top-right-icon picture" @click="showPopup"></i>
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
        <van-swipe-item v-for="(image, index) in viewInfo.coverImageList" :key="index">
          <div class="backgorund-img" :style="{backgroundImage: 'url('+image+')'}"></div>
        </van-swipe-item>
      </van-swipe>
    </div>
<!--  头像  -->
    <div class="profile" :style="{backgroundImage: 'url('+viewInfo.headImg+')'}"></div>
<!--    本人页面展示-->
    <div class="my-page" v-if="userInfo.userId == viewInfo.userId">
      <div class="tag">
        <div class="gender-tag" :class="{'male' : viewInfo.sex == 1, 'female' : viewInfo.sex == 2} ">
          <i class="gender-icon" :class="{'icon-male' : viewInfo.sex == 1, 'icon-female' : viewInfo.sex == 2} "/>
          <span class="age">{{viewInfo.age}}</span>
        </div>
        <div class="constellation-tag">
          {{viewInfo.constellation}}
        </div>
      </div>
      <div class="account-info-btn">帐号资料</div>
      <div class="blank"></div>
      <div class="username">{{viewInfo.realNickName}}({{viewInfo.anonymous}})</div>
      <progress-bar
        :currentStatus="viewInfo.experienceNum"
        :totalStatue="viewInfo.maxExperienceNum"
        :lv="viewInfo.wealthGrade"
      />
    </div>
<!--    他人页面展示-->
    <div class="others-page" v-else>
      <div class="username">{{viewInfo.realNickName}}({{viewInfo.anonymous}})</div>
      <div class="tag">
        <div class="gender-tag" :class="{'male' : viewInfo.sex == 1, 'female' : viewInfo.sex == 2} ">
          <i class="gender-icon" :class="{'icon-male' : viewInfo.sex == 1, 'icon-female' : viewInfo.sex == 2} "/>
          <span class="age">{{viewInfo.age}}</span>
        </div>
        <div class="constellation-tag">
          {{viewInfo.constellation}}
        </div>
      </div>
    </div>
<!--    勋章-->
    <div class="medal" v-if="viewInfo.whetherMember == 2 || viewInfo.medalVos">
      <div class="v-info" v-if="viewInfo.whetherMember == 2">
        <i class="v-icon-small"></i>
        {{viewInfo.identity}}
      </div>
      <medal class="medal-item"
           v-for="(item, index) in viewInfo.medalVos"
           :key="index"
           :item="item"
      ></medal>
    </div>
<!--    个人简介-->
    <div class="person-information">{{viewInfo.personInformation}}</div>
<!--  follow & follower  -->
    <div class="ff">
      关注
      <span class="ffNum">{{viewInfo.attention}}</span>
      <span class="split-line">|</span>
      粉丝
      <span class="ffNum">{{viewInfo.fan}}</span>
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
import progressBar from '@/components/ProgressBarNew'
import Medal from '@/components/Medal'
import {addAttention, cancelAttention} from "@/api/my/index.js"
export default {
  components: {
    progressBar,
    Medal
  },
  mixins: [],
  name: '',
  data () {
    return {
      show: false
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
    }
    .my-page{
      .tag {
         color: #ffffff;
         font-size: 0.24rem;
         text-align: center;
         margin-left: -0.7rem;
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
           /*margin: 0 auto;*/
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
      .account-info-btn{
        width: 1.55rem;
        height: 0.6rem;
        border:1px solid #0BCEE5;
        border-radius: 0.07rem;
        text-align: center;
        line-height: 0.6rem;
        color: #02C9EF;
        font-size: 0.28rem;
        position: absolute;
        right: 0.2rem;
        top: 6.9rem;
      }
      .blank{
        /*height: 0.6rem;*/
      }
      .username {
        font-size: 0.32rem;
        color: #41CAC0;
        display: inline-block;
        margin-left: 0.3rem;
        vertical-align: bottom;
        font-weight: 600;
      }
    }
    .others-page{
      position: relative;
      .username {
        display: inline;
        font-size: 0.32rem;
        color: #41CAC0;
        display: inline-block;
        vertical-align: bottom;
        font-weight: 600;
        left: 2.1rem;
        position: absolute;
        top: 0.2rem;
      }
      .tag {
        color: #ffffff;
        font-size: 0.24rem;
        position: relative;
        top: 0.25rem;
        left: 5rem;
        .gender-tag {
          text-align: center;
          display: inline-block;
          margin: 0 auto;
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
          /*margin: 0 auto;*/
          height: 0.4rem;
          width: 1rem;
          border-radius: 0.2rem;
          position: relative;
          vertical-align: middle;
          text-align: center;
          background-color: #FFC824;
          margin-left: 0.2rem;
          line-height: 0.4rem;
        }
      }
    }
    .medal{
      /*display: inline-block;*/
      font-size: 0.24rem;
      color: #5C5C5C;
      margin-bottom: 0.3rem;
      .v-info {
        display: inline-block;
        color: #5C5C5C;
        padding: 0.3rem 0 0 0.3rem;
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
    .person-information{
      margin-left: 0.3rem;
      margin-bottom: 0.3rem;
      height: 0.3rem;
      font-size: 0.24rem;
      color: #5C5C5C;
    }
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
