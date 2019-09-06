<template>
  <div class="home-box">
    <div class="hb-bg">
      <ul>
        <router-link tag="li" to="/index/home/homeHome/attention" active-class="active" exact>关注</router-link>
        <router-link tag="li" to="/index/home/homeHome/hot" active-class="active" exact>热门</router-link>
      </ul>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang="less" scoped>
.hb-bg {
  background: url("./../../../../static/images/ForumPosts/background.png");
  background-size: 100%;
  width: 100%;
  height: 2.95rem;
  ul {
    display: flex;
    justify-content: center;
    padding-top: 0.33rem;
    li {
      font-size: 0.28rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      margin: 0 0.3rem;
      &.active {
        font-size: 0.32rem;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
        position: relative;
        &::after {
          content: "";
          width: 0.4rem;
          height: 0.06rem;
          background: rgba(35, 210, 205, 1);
          border-radius: 0.04rem;
          position: absolute;
          bottom: -0.2rem;
          left: 0;
          right: 0;
          margin: 0 auto;
        }
      }
    }
  }
}
.home-box {
  height: 100%;
  overflow: hidden;
}
</style>
