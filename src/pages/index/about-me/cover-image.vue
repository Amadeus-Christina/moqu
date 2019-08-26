<template>
  <div class="cover-img">
    <div class="edit clear">
      <div class="text right" @click="changeMode">{{mode}}</div>
    </div>
    <span v-for="(item, index) in imgData" :key="index">
      <div class="img" :style="{backgroundImage: 'url('+item+')'}">
        <van-checkbox v-model="checked[index]" checked-color="#23D2CD" v-if="mode == '取消'"></van-checkbox>
      </div>
    </span>
    <div class="sure" v-show="mode == '编辑'">上传照片</div>
    <div class="sure red" v-show="mode == '取消'" :class="{'gray': checked.filter(item =>{ return item == true}).length == 0}">删 除</div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      // imgData: [
      //   '/static/images/mock/01.jpg',
      //   '/static/images/mock/02.jpg',
      //   '/static/images/mock/03.jpg',
      //   '/static/images/mock/04.jpg',
      //   '/static/images/mock/05.jpg'
      // ],
      mode: '编辑',
      checked: []
    }
  },
  props: {},
  computed: {
    imgData () {
      return this.$store.state.userInfo.coverImageList
    }
  },
  watch: {},
  methods: {
    // 切换 编辑/删除模式
    changeMode () {
      this.mode = this.mode === '编辑' ? '取消' : '编辑'
      this.checked = []
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
  .cover-img{
    .edit{
      color: #444444;
      font-size: 0.28rem;
      height: 0.8rem;
      .text {
        line-height: 0.8rem;
        margin-right: 0.25rem;
      }
    }
    .img{
      display: inline-block;
      width: 2.23rem;
      height: 2.23rem;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      margin-left: 0.2rem;
      position: relative;
    }
    .select{
      position: absolute;
      right: 0;
    }
    .sure{
      text-align: center;
      line-height: 0.9rem;
      position: absolute;
      bottom: 1.5rem;
      left: 0.8rem;
      box-shadow: 0 0;
      &.red{
        background: #FD493E;
      }
      &.gray{
        background: #E3E3E3;
      }
    }
  }
</style>
<style lang="less">
  .cover-img{
    .van-checkbox__icon{
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
    }
  }

</style>
