<template>
  <div class="walletItem" :class="{'active': activeIndex === index}" @click="change()">
    <div class="diamond">
      <div class="diamond-num" v-text="item.numberOfDiamonds"></div>
      <div class="diamond-icon-gold" v-show="activeIndex === index"></div>
      <div class="diamond-icon" v-show="activeIndex !== index"></div>
    </div>
    <div class="price">￥{{item.money}}</div>
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
  props: ['item', 'index', 'activeIndex'],
  computed: {},
  watch: {},
  methods: {
    //激活状态切换
    change() {
      this.$emit('changeActiveIndex', this.index)
      this.$emit('changeAmount', this.item.price)
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
  .walletItem{
    width: 2.11rem;
    height: 1.84rem;
    border: 1px solid #B5B5B5FF;
    color: #B5B5B5FF;
    border-radius: 0.18rem;
    margin-bottom: 0.3rem;
    .diamond{
      height: 1.1rem;
      font-size: 0.42rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight:600;
      .diamond-icon,
      .diamond-icon-gold{
        height: 0.3rem;
        width:0.3rem;
        background-size: 0.3rem 0.3rem;
        background-position: center center;
        margin-left: 0.06rem;
      }
      .diamond-icon-gold{
        background-image: url("/static/images/account-info/diamond_on.png");
      }
      .diamond-icon{
        background-image: url("/static/images/account-info/diamond.png");
      }
    }
    .price {
      font-size: 0.32rem;
      display: flex;
      justify-content: center;
    }
  }
  .active {
    color: #FFC824FF;
    border: 1px solid #FFC824FF;
  }
</style>
