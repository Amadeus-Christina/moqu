<template>
  <div class="title">
    <div class="container">
      <div class="documents" :class="{active: show=='documents'}" @click="documentsActive()">
        认证材料
        <div class="bar" v-show="show=='documents'"></div>
      </div>
      <div class="manage" :class="{active: show=='manage'}" @click="manageActive()">
        车辆管理
        <div class="bar" v-show="show=='manage'"></div>
      </div>
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
    }
  },
  props: ['show'],
  computed: {},
  watch: {},
  methods: {
    // 我的关注 选项卡 激活, 并发送给父组件要显示的页面
    documentsActive () {
      this.$emit("show", 'documents')
    },
    // 我的粉丝 选项卡 激活 , 并发送给父组件要显示的页面
    manageActive () {
      this.$emit("show", 'manage')
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
  .title {
    height: 0.9rem;
    background-color: #ffffff;
    font-size: 0.28rem;
    color: #5C5C5CFF;
    text-align: center;
    .container{
      width: 7rem;
      border-bottom: 1px solid #F7F7F7FF;
      margin: 0 auto;
    }
    .documents,
    .manage {
      display: inline-block;
      line-height: 0.9rem;
      margin: 0 1.1rem;
      &.active {
        color: #41CAC0FF;
      }
    }
    .bar {
      height: 0.04rem;
      width: 1.12rem;
      background-color: #41CAC0FF;
      margin: 0 auto;
      border-radius: 0.02rem;
    }
  }
</style>
