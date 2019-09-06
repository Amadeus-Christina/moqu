<template>
  <div class="setting">
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
          iconPath: '../../../../../static/images/account-info/TheeditorI.png',
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
  .setting{
    height: 100%;
    width: 100%;
    background: #F7F7F7;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .logout {
      margin-bottom: 1.7rem;
    }
  }

</style>
