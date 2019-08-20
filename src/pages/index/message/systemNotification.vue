<template>
  <div class="">
    <sys-note :msg="msg"/>
  </div>
</template>
<script>
import sysNote from '@/components/system-notification-item'
export default {
  components: {
    sysNote
  },
  mixins: [],
  name: '',
  data () {
    return {
      msg: [
        {
          title: '黄金大会员开通成功',
          content: '恭喜你开通了大会员服务',
          time: '1小时前'
        },
        {
          title: '举报处理结果通知',
          content: '您好，您在同城贴【xxxxx】中举报的评论「都是羊」已被删除，原因「广告骚扰」，感谢您对陌趣社区秩序维护',
          time: '1小时前'
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
