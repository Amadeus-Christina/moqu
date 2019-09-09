<template>
  <div class="fillcontain">
    <item-list :itemInfo="accountInfoItemList" />
  </div>
</template>
<script>
import itemList from '@/components/ItemList'
import authenticationIcon from '#/account-info/certification.png'
import memberIcon from '#/account-info/members.png'
import walletIcon from '#/account-info/wallet.png'
import mobilephoneIcon from '#/account-info/Mobilephone.png'
import recruitingIcon from '#/account-info/recruiting.png'
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
          iconPath: authenticationIcon,
          toPath: '/index/authentication',
        },
        {
          name: '我的会员',
          iconPath: memberIcon,
          toPath: '/index/member',
        },
        {
          name: '我的钱包',
          iconPath: walletIcon,
          toPath: '/index/wallet',
        },
        // {
        //   name: '手机认证',
        //   iconPath: mobilephoneIcon,
        //   toPath: '/index/phoneAuthentication',
        // },
        {
          name: '日出联盟',
          iconPath: recruitingIcon,
          toPath: '/index/sunrise',
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
  },
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
  .fillcontain{
    background: #ffffff;
  }
</style>
