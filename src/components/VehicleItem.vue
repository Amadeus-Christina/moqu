<template>
  <div class="vehicle-item">
    <img class="img" :src="item.logo" alt="">
    <div class="model">{{item.model}}</div>
    <div class="car-number">{{item.area}} · {{item.number}}</div>
    <div class="btn" :class="{'green': item.buttonStatus === '正在使用'}">{{item.buttonStatus}}</div>
    <div class="right-top" :class="{'through': item.status === 'through'}"></div>
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
  props: ['item'],
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
  .vehicle-item{
    height: 3.75rem;
    width: 3.3rem;
    box-shadow:0px 0px 30px 0px rgba(213,213,213,0.4);
    border-radius:20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 0.4rem;
    margin-left: 0.3rem;
    .img{
      height: 1rem;
      width: 1rem;
      margin: 0.4rem auto 0;
    }
    .model{
      margin: 0.2rem auto 0.1rem;
    }
    .car-number{
      width: 2.2rem;
      height: 0.5rem;
      border-radius: 0.1rem;
      background-color: #007BFF;
      text-align: center;
      line-height: 0.5rem;
      color: #FFFFFF;
      margin: 0 auto 0.3rem;
      font-weight:400;
    }
    .btn{
      width:1.56rem;
      height: 0.5rem;
      border: 1px solid #999999;
      border-radius: 0.25rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.24rem;
      color: #999999;
      margin: 0 auto 0.3rem;
      &.green{
        background: #23D2CD;
        border: none;
        color: #FFFFFF;
      }
    }
  }

</style>
