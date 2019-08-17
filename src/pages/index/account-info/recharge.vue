<template>
  <div class="wallet">
    <wallet-item
      class="wallet-item-group"
      v-for="(item,index) in wallet"
      :key="index" :item="item" :index="index" :activeIndex="activeIndex"
      @changeActiveIndex="changeActiveIndex"
      />
    <button class="sure recharge">立即充值</button>
  </div>
</template>
<script>
  import walletItem from '@/components/WalletItem'
  export default {
    components: {
      walletItem
    },
    mixins: [],
    name: '',
    data() {
      return {
        activeIndex: 0,
        wallet: [
          {
            diamondNum: 50,
            price: 50
          },
          {
            diamondNum: 100,
            price: 100
          },
          {
            diamondNum: 200,
            price: 200
          },
          {
            diamondNum: 500,
            price: 450
          },
          {
            diamondNum: 1000,
            price: 800
          },
          {
            diamondNum: 2000,
            price: 1500
          },
        ]
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      // 切换激活状态
      changeActiveIndex(Index) {
        this.activeIndex = Index
      }
    },
    mounted() {
    },
    created() {
    },
    filters: {},
    directives: {},
    beforeDestroy() {
    },
    destroyed() {
    }
  }
</script>
<style scoped lang="less">
  .wallet {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .recharge{
    position: absolute;
    bottom: 1.4rem;
  }
</style>
