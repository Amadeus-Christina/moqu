<template>
  <div class="follow-item">
    <div class="container">
      <div class="profile" :style="{backgroundImage: 'url('+followUserInfo.headImg+')'}"></div>
      <div class="username">{{followUserInfo.realNickName}}({{followUserInfo.anonymous}})</div>
      <div class="gender-tag" :class="{'male' : followUserInfo.sex === '1', 'female' : followUserInfo.sex === '2'} ">
        <i class="gender-icon" :class="{'icon-male' : followUserInfo.sex === '1', 'icon-female' : followUserInfo.sex === '2'} "/>
        <span class="age">{{followUserInfo.age}}</span>
      </div>
      <div class="follow-button">
<!--        <follow-button :following="followUserInfo.following" :isFollower="followUserInfo.isFollower" :showView="showView"/>-->
        <follow-button :itemUserId="followUserInfo.userId" :showView="showView"/>
      </div>
    </div>
  </div>
</template>
<script>
import followButton from '@/components/FollowButton'
export default {
  components: {
    followButton
  },
  mixins: [],
  name: '',
  data () {
    return {}
  },
  props: ['followUserInfo','showView'],
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
  .follow-item {
    height: 1.4rem;
    background-color: #ffffff;
    font-size: 0.28rem;
    color: #323232FF;
    text-align: center;
    .container {
      height: 1.4rem;
      width: 7rem;
      border-top: 1px solid #F7F7F7FF;
      margin: 0 auto;
      display: flex;
      align-items: center;
      position: relative;
    }
    .profile{
      width: 0.8rem;
      height: 0.8rem;
      background-position: center center;
      background-size: 0.8rem 0.8rem;
      background-repeat: no-repeat;
      border-radius: 50%;
    }
    .username {
      font-size: 0.28rem;
      color: #323232FF;
      margin-left: 0.5rem;
      font-weight: 500;
    }
    .gender-tag {
      margin-left: 0.2rem;
      color: #ffffff;
      font-size: 0.2rem;
      text-align: center;
      display: inline-block;
      /*margin: 0 auto;*/
      height: 0.3rem;
      width: 0.7rem;
      border-radius: 0.15rem;
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
        width: 0.2rem;
        height: 0.2rem;
        background-size: 0.2rem 0.2rem;
        background-repeat: no-repeat;
        vertical-align: middle;
        line-height: 0.2rem;
        /*position: absolute;*/
        &.icon-male{
          background-image: url("../../static/images/about-me/male.png");
        }
        &.icon-female {
          background-image: url("../../static/images/about-me/female.png");
        }
      }
      .age {
        vertical-align: middle;
      }
    }
    .follow-button {
      position: absolute;
      right: 0rem;
      top: 0.2rem;
    }
  }
</style>
