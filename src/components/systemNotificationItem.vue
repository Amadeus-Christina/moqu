<template>
  <div class="sys-note fillcontain">
    <div class="blank" v-if="msg == undefined || msg.length <=0 ">
      <div class="container">
        <img class="container-img" src="../../static/images/message/nocontent.png" alt="无评论"/>
        <div class="text">还没有消息哦～</div>
      </div>
    </div>
    <div class="sys-note-group" v-for="(item, index) in msg" :key="index">
      <div class="title">{{item.systemInfomationTitle}}</div>
      <div class="content">{{item.systemInfomation}}</div>
      <div class="time">{{item.timeDifference}}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {}
  },
  props: ['msg'],
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
  .blank {
    .container{
      height: 3rem;
      width: 2.5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1.5rem;
      margin-left: -1.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      .container-img {
        max-width: 2rem;
      }
      .text {
        font-size: 0.24rem;
        color: #B5B5B5;
      }
    }
  }
  .sys-note-group{
    border-bottom: 1px solid #F5F5F5;
    padding: 0.3rem;
    .title{
      padding-bottom: 0.2rem;
      font-size: 0.32rem;
      color: #323232;
      font-weight: 600;
    }
    .content{
      padding-bottom: 0.2rem;
      font-size: 0.28rem;
      color: #323232;
    }
    .time {
      font-size: 0.24rem;
      color: #B5B5B5;
    }
  }
</style>
