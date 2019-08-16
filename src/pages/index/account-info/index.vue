<template>
  <div class="">
    <item-list :itemInfo="accountInfoItemList" />
  </div>
</template>
<script>
import itemList from '@/components/ItemList'
export default {
  components: {
    itemList
  },
  mixins: [],
  name: '',
  data () {
    return {
      accountInfoItemList: [
        {
          name: '身份认证',
          iconPath: '/static/images/account-info/certification.png',
          toPath: '/',
        },
        {
          name: '我的会员',
          iconPath: '/static/images/account-info/members.png',
          toPath: '/',
        },
        {
          name: '我的钱包',
          iconPath: '/static/images/account-info/wallet.png',
          toPath: '/',
        },
        {
          name: '日出联盟招募',
          iconPath: '/static/images/account-info/recruiting.png',
          toPath: '/',
        }
      ]
    }
  },
  props: {},
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
</style>
