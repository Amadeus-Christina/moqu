<template>
  <div class="login over-screen">
    <img src="../../../static/images/login/logo.png" class="logo" />
    <div class="wx-login" @click="wxLogin">
      <img src="../../../static/images/login/WeChat.png" />
      <span>微信账号快速登录</span>
    </div>
  </div>
</template>
<script>
import { judgeIsNeedPerfect } from "@/api/login/index";
export default {
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    // 设置cookie缓存，并判断需不需要完善信息
    next(vm => {
      let userId = vm.$Cookies.get("userId");
      if (userId) {
        needPerfect(userId);
      } else {
        userId = to.query.userId;
        if (userId) {
          vm.$Cookies.set("userId", userId);
          needPerfect(userId);
        } else {
          next();
        }
      }
      // 需不需要完善信息
      function needPerfect(userId) {
        judgeIsNeedPerfect(userId).then(res => {
          if (res.code == 200) {
            let { status } = res.data;
            if (status == 1) {
              next("/register");
            } else if (status == 2) {
              next();
            }
          }
        });
      }
    });
  },
  methods: {
    // 微信快速登录
    wxLogin() {
      let url = window.btoa(window.location.href);
      window.location.href = `${this.$webUrl}/web/weChat/authorize?returnUrl=${url}`;
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  background: linear-gradient(
    144deg,
    rgba(80, 104, 127, 1) 0%,
    rgba(30, 46, 72, 1) 100%
  );
  .logo {
    width: 4.88rem;
    display: block;
    margin: 1.47rem auto 0;
  }
  .wx-login {
    width: 6rem;
    margin: 1.7rem auto 0;
    height: 0.9rem;
    background: linear-gradient(
      90deg,
      rgba(0, 200, 240, 1) 0%,
      rgba(30, 218, 212, 1) 100%
    );
    box-shadow: 0px 0px 0.3rem 0px rgba(1, 63, 112, 0.43);
    border-radius: 0.18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    color: #ffffff;
    > img {
      width: 0.5rem;
      height: 0.41rem;
      margin-right: 0.3rem;
    }
  }
}
</style>