<template>
  <div class="sys-note">
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
  .sys-note{
    margin-bottom: 2rem;
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
