<template>
  <div class="">
    <item-list :itemInfo="accountInfoItemList" />
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {myInformation} from "@/api/my/index.js"
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
          toPath: '/index/authentication',
        },
        {
          name: '我的会员',
          iconPath: '/static/images/account-info/members.png',
          toPath: '/index/member',
        },
        {
          name: '我的钱包',
          iconPath: '/static/images/account-info/wallet.png',
          toPath: '/index/wallet',
        },
        {
          name: '手机认证',
          iconPath: '/static/images/account-info/Mobilephone.png',
          toPath: '/index/phoneAuthentication',
        },
        {
          name: '日出联盟',
          iconPath: '/static/images/account-info/recruiting.png',
          toPath: '/index/sunrise',
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    ...mapMutations([
      'SET_USER_INFO'
    ]),
    async getMyInfo () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      // 获取本人信息
      await myInformation(2).then(res => {
        if (res.code == 200) {
          this.SET_USER_INFO(res.data)
        } else {
          this.$toast(res.msg)
        }
      })
      this.$toast.clear();
    }
  },
  mounted () {
    this.getMyInfo()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
</style>
