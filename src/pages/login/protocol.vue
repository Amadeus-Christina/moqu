<template>
  <div class="protocol bg">{{agreement}}</div>
</template>
<script>
export default {
  data() {
    return {
      agreement: "尊敬的客户，在您使用我们的服务前，请仔细阅读本用户协议。"
    }
  }
};
</script>
<style lang="less" scoped>
.protocol{
    color: #444444;
    font-size: 0.28rem;
    padding: 0.3rem;
    box-sizing: border-box;
}
</style>