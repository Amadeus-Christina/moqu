<template>
  <div class="about-me">
    <user-info-show :userInfo="userInfo" :viewInfo="viewInfo"/>
  </div>
</template>
<script>
import userInfoShow from '@/components/UserInfoShow'
export default {
  components: {
    userInfoShow
  },
  mixins: [],
  name: '',
  data () {
    return {
      // 本人信息
      userInfo: {
        ID: 13
      },
      // 访问的页面信息
      viewInfo: {
        ID: 12,
        username: '烈烈龙',
        anonymousUsername: '敖烈',
        isVip: true,
        vipInfo: '日出联盟会长',
        gender: '女',
        age: 20,
        constellation: '处女座',
        follow: 231,
        followers: 23124,
        lv: 5,
        profile: '/static/images/mock/03.jpg',
        currentStatus: 1234,
        totalStatue: 2345,
        imagesShowIist: [
          '/static/images/mock/01.jpg',
          '/static/images/mock/02.jpg',
          '/static/images/mock/03.jpg',
          '/static/images/mock/04.jpg',
          '/static/images/mock/05.jpg'
        ]
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
</style>
