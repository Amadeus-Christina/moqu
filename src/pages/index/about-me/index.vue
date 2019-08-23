<template>
  <div class="about-me">
    <user-info-show :userInfo="userInfo" :viewInfo="viewInfo" :album="album" :isFollower="isFollower"/>
  </div>
</template>
<script>
  import userInfoShow from '@/components/UserInfoShow'
  import {myInformation, myAlbum, intercommunication} from "@/api/my/index.js"

  export default {
    components: {
      userInfoShow
    },
    mixins: [],
    name: '',
    data() {
      return {
        // // 本人信息
        // userInfo: {
        //   ID: 12
        // },
        // // 访问的页面信息
        // viewInfo: {
        //   ID: 12,
        //   username: '烈烈龙',
        //   anonymousUsername: '敖烈',
        //   isVip: true,
        //   vipInfo: '日出联盟会长',
        //   gender: '女',
        //   age: 20,
        //   constellation: '处女座',
        //   follow: 231,
        //   followers: 23124,
        //   lv: 5,
        //   profile: '/static/images/mock/03.jpg',
        //   currentStatus: 1234,
        //   totalStatue: 2345,
        //   imagesShowIist: [
        //     '/static/images/mock/01.jpg',
        //     '/static/images/mock/02.jpg',
        //     '/static/images/mock/03.jpg',
        //     '/static/images/mock/04.jpg',
        //     '/static/images/mock/05.jpg'
        //   ]
        // }

        // 本人信息
        userInfo: {},
        // 访问的页面信息
        viewInfo: {},
        // 访问页面的相册信息
        album: {},
        // 本人是否关注了访问页面的主人
        isFollower: false
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      async getMessage() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          // loadingType: "spinner",
          message: "加载中..."
        });
        // 获取本人信息
        await myInformation(2).then(res => {
          if (res.code == 200) {
            this.userInfo = res.data
            console.log('userInfo',this.userInfo)
          } else {
            this.$toast(res.msg)
          }
        })

        // 获取访问页面人信息
        await myInformation(1).then(res => {
          if (res.code == 200) {
            this.viewInfo = res.data
            console.log('viewInfo',this.viewInfo)
          } else {
            this.$toast(res.msg)
          }
        })

        // 获取访问页面的相册
        await myAlbum(1).then(res => {
          if (res.code == 200) {
            this.album = res.data
          } else {
            this.$toast(res.msg)
          }
        })

        // 获取两个用户之间的关注关系，参数（本人用户编号， 访问页面人的编号）
        await intercommunication(this.userInfo.userID, this.viewInfo.userID).then(res => {
          if (res.code == 200) {
            if (res.data == 0){
              this.isFollower = true
            } else {
              this.isFollower = false
            }
            console.log(this.isFollower)
          } else {
            this.$toast(res.msg)
          }
        })

        this.$toast.clear();

      }
    },
    mounted() {
    },
    created() {

      this.getMessage()
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
</style>
