<template>
  <div class="user-info-show">
    <i v-if="userInfo.userId == viewInfo.userId" class="top-right-icon setting"></i>
    <div v-else class="top-right-icon follow" :class="{'gray' : isFollower == true}">
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
  </div>
</template>
<script>
import {addAttention, cancelAttention} from "@/api/my/index.js"
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {}
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
    }
    .backgorund-img {
      height: 6.77rem;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
</style>
