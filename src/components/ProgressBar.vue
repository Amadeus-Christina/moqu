<template>
  <div class="progress-bar">
    <div class="current-status" :style="{ width: (currentStatus/totalStatue)*3.3 + 'rem' }"></div>
    <span class="progress-bar-num">{{currentStatus}}/{{totalStatue}}</span>
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
  props: ['currentStatus','totalStatue'],
  computed: {},
  watch: {},
  methods: {},
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
  .progress-bar{
    width: 3.3rem;
    height: 0.3rem;
    background-color: #DDDDDD;
    border-radius: 0.15rem;
    font-size: 0.24rem;
    color: #ffffff;
    position: relative;
    .current-status{
      height: 0.3rem;
      border-radius: 0.15rem;
      background: linear-gradient(to right, #00C8F0 , #1EDAD4);
      padding-right: 0.1rem;
    }
    .progress-bar-num{
      position: absolute;
      top:0;
      left: 1rem;
      line-height: 0.3rem;
    }
  }
</style>
