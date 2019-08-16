<template>
  <div class="">
    <item-list :itemInfo="accountInfoSettingItemList" />
    <button class="sure logout">退出登录</button>
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
      accountInfoSettingItemList: [
        {
          name: '编辑信息',
          iconPath: '/static/images/account-info/TheeditorI.png',
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
  .logout {
    position: relative;
    top: 4.74rem;
  }
</style>
