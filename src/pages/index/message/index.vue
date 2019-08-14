<template>
  <div class="">
    <item-list :itemInfo="messageItemList" />
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
      messageItemList:[
        {
          name: '评论',
          iconPath: '/static/images/message/replyI.png',
          toPath: '/',
          msgNum: 0
        },
        {
          name: '@我',
          iconPath: '/static/images/message/@I.png',
          toPath: '/',
          msgNum: 0
        },
        {
          name: '收到的赞',
          iconPath: '/static/images/message/goodII.png',
          toPath: '/',
          msgNum: 99
        },
        {
          name: '悄悄话',
          iconPath: '/static/images/message/whispersI.png',
          toPath: '/',
          msgNum: 3
        },
        {
          name: '系统消息',
          iconPath: '/static/images/message/SystemmessageI.png',
          toPath: '/',
          msgNum: 0
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
