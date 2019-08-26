<template>
  <div class="progress-bar">
    <div class="header">
      <div class="lv">LV {{lv}}</div>
      <div class="status">
        {{currentStatus}}/{{totalStatue}}
      </div>
    </div>
    <div class="bar">
      <div class="current-status" :style="{ width: (currentStatus/totalStatue)*3.3 + 'rem' }"></div>
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
  props: ['currentStatus','totalStatue','lv'],
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
  .progress-bar{
    width: 3.4rem;
    height: 0.7rem;
    display: inline-block;
    .header{
      display: inline;
      .lv{
        padding: 0 0.1rem;
        display: inline-block;
        height: 0.3rem;
        font-size: 0.18rem;
        color: #FFFFFF;
        font-weight: 600;
        background-color: #23D2CD;
        text-align: center;
        line-height: 0.3rem;
        border-radius: 0.15rem;
      }
      .status{
        display: inline-block;
        font-size: 0.24rem;
        color: #B5B5B5;
      }
    }
    .bar{
      width: 3.3rem;
      height: 0.1rem;
      border-radius: 0.05rem;
      background-color: #A1A1A1;
      position: absolute;
      margin-top: -0.1rem;
    }
    .current-status{
      height: 0.1rem;
      border-radius: 0.15rem;
      background: linear-gradient(to right, #00C8F0 , #1EDAD4);
      padding-right: 0.1rem;
      position: relative;
    }

  }
</style>
