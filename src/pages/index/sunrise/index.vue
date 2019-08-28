<template>
  <div class="sunrise">
    <van-image
      round
      width="1.6rem"
      height="1.6rem"
      fit="cover"
      :src=mock.headImg
      class="head-img"
    />
    <div class="name">{{mock.realNickName}}({{mock.anonymous}})</div>
    <div class="invite-code">专属邀请码：{{mock.inviteCode}}</div>
    <div class="dealer">

    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      mock:{
        headImg:'/static/images/mock/01.jpg',
        realNickName: '烈烈龙',
        anonymous: '敖烈',
        inviteCode: 121212,
        lv: 0,
        personNum: 21,
        rights: '返利5%',
        today: 12,
        month: 6666.00,
        total: 10101.00
      }
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
  .sunrise{
    display: flex;
    flex-direction: column;
    align-items: center;
    .head-img{
      margin-top: 0.8rem;
    }
    .name{
      color: #333333;
      font-size: 0.32rem;
      font-weight: 600;
      margin-top: 0.4rem;
    }
    .invite-code{
      color: #999999;
      font-size: 0.24rem;
      margin-top: 0.1rem;
      margin-bottom: 0.4rem;
    }
  }
</style>
