<template>
  <div class="documents-item-wrap">
    <div class="text">{{item.title}}:</div>
    <div class="img-group">
      <van-uploader
        :after-read="afterRead"
        :before-delete="beforeDelete"
        v-model="fileList"
        :max-count="1"
      >
        <img :src=item.imgSrc alt="图像" class="img">
        <div class="msg">{{item.msg}}</div>
      </van-uploader>
    </div>

  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      fileList: [
      ]
    }
  },
  props: ['item'],
  computed: {},
  watch: {},
  methods: {
    // 把文件传给父组件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file);
      this.$set(file,'name',this.item.name)
      this.$emit('add', file)
    },
    beforeDelete(file) {
      this.$emit('deleteUpload', file.name)
      return true
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
  .documents-item-wrap{
    width: 6.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.6rem;
    .text{
      align-self: flex-start;
      color: #333333;
      font-size: 0.32rem;
      margin-top: 0.4rem;
      margin-bottom: 0.4rem;
      font-weight: 400;
    }
    .img-group{
      position: relative;
      .img{
        width: 6rem;
        height: 3.2rem;
        display: inline-block;
        box-shadow:0px 0px 30px 0px rgba(213,213,213,0.4);
        border-radius: 0.18rem;
      }
      .msg{
        width: 6rem;
        height: 0.6rem;
        color: #ffffff;
        background:rgba(0,0,0,0.2);
        font-size: 0.24rem;
        border-radius: 0 0 0.18rem 0.18rem;
        text-align: center;
        line-height: 0.6rem;
        position: absolute;
        bottom: 0.25rem;
      }
    }

  }
</style>
<style lang="less">
  .documents-item-wrap{
    .van-uploader__preview-image{
      width: 6rem;
      height: 3.2rem;
    }
  }
</style>
