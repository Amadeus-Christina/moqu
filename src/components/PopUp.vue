<template>
  <div class="bg-gray">
    <div class="pop-up-box">
      <div class="pub-top" v-if="title">
        <div></div>
        <div>{{title}}</div>
        <div @click="shutDownFn">
          <img src="../../static/images/ForumPosts/Shutdown.png" alt />
        </div>
      </div>
      <!-- <div class="pub-content">
        <div class="pay-money">
          <input type="text" placeholder="请输入" />
          <img src="/static/images/ForumPosts/diamondI.png" alt />
        </div>
      </div>-->
      <slot name="content"></slot>
      <div class="btn-style" @click="confirmFn">{{btnText}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: [String, Number],
      default: ""
    },
    isShutDown: {
      type: Boolean,
      default: false
    },
    btnText:{
      type:String,
      default:'确定'
    }
  },
  methods: {
    shutDownFn() {
      this.isShutDown = false;
      this.$emit("isShutDownFn", this.isShutDown);
    },
    confirmFn(){
      let confirmState=true
      this.$emit("isConfirmFn",confirmState)
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.bg-gray {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
.pop-up-box {
  transform: translateY(4rem);
  background: #fff;
  width: 5.4rem;
  margin: auto;
  border-radius: 0.18rem;
  padding-bottom: 0.3rem;
}
.pub-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.18rem;
  border-bottom: 2px solid #f5f5f5;
  div:nth-of-type(2) {
    font-size: 0.32rem;
    font-weight: 600;
    color: rgba(66, 66, 66, 1);
  }
  div:nth-of-type(3) {
    display: flex;
    img {
      width: 0.27rem;
      height: 0.26rem;
    }
  }
}
.pub-content {
  padding: 0.3rem 0.3rem;
  box-sizing: border-box;
}
.pay-money {
  display: flex;
  border: 1px solid #b5b5b5;
  border-radius: 0.18rem;
  align-items: center;
  padding: 0.1rem 0.2rem;
  input {
    width: 4.05rem;
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(181, 181, 181, 1);
    border-right: 1px solid #f5f5f5;
    margin-right: 0.2rem;
  }
  img {
    width: 0.32rem;
    height: 0.28rem;
  }
}
.btn-style {
  margin: 0 auto;
  width: 2rem;
  height: 0.6rem;
  background: rgba(35, 210, 205, 1);
  border-radius: 0.3rem;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 0.6rem;
}
</style>
