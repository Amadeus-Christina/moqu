<template>
    <div class="about-me" v-if="viewInfo">
        <user-info-show-new
                :viewInfo="viewInfo"
                :album="album"
                :isFollower="isFollower"
                @changeIsFollower="changeIsFollower"
                :haveAuthenticationList="haveAuthenticationList"
        />
    </div>
</template>
<script>
  import userInfoShowNew from "@/components/UserInfoShowNew";
  import { myInformation, intercommunication } from "@/api/my/index.js";
  import { myCarManagement } from "@/api/my/index.js";
  import { mapState, mapMutations, mapActions } from "vuex";
  export default {
    components: {
      userInfoShowNew
    },
    mixins: [],
    name: "",
    data() {
      return {
        // 本人信息
        // userInfo: {},
        // 访问的页面信息
        // viewInfo: {},
        // 访问页面的相册信息
        album: {},
        // 本人是否关注了访问页面的主人
        isFollower: false,
        // 认证的车辆
        haveAuthenticationList: null
      };
    },
    props: {},
    computed: {
      ...mapState(["viewInfo", "userInfo"])
    },
    watch: {},
    methods: {
      ...mapActions(["setUserInfo", "setViewInfo"]),
      async getMessage() {
        this.$toast.loading({
          duration: 0,
          forbidClick: true,
          // loadingType: "spinner",
          message: "加载中..."
        });

        await this.$store.dispatch("setUserInfo", 1);
        await this.$store.dispatch("setViewInfo", 1);

        // 获取要显示的车辆信息
        await myCarManagement(this.viewInfo.userId).then(res => {
          this.haveAuthenticationList = res.data.HaveAuthentication.filter(
            item => {
              return item.type == "0";
            }
          );
        });

        if (this.userInfo.userId != this.viewInfo.userId) {
          // 获取两个用户之间的关注关系，参数（本人用户编号， 访问页面人的编号）
          await intercommunication(
            this.userInfo.userId,
            this.viewInfo.userId
          ).then(res => {
            if (res.code == 200) {
              if (res.data == 0) {
                this.isFollower = true;
                // console.log(res.data, '已关注')
              } else {
                this.isFollower = false;
                // console.log(res.data, '未关注')
              }
            } else {
              this.$toast(res.msg);
            }
          });
        }
        this.$toast.clear();
      },

      // 改变关注状态
      changeIsFollower(val) {
        this.isFollower = val;
      }
    },
    mounted() {},
    created() {
      this.getMessage();
    },
    filters: {},
    directives: {},
    beforeDestroy() {},
    destroyed() {}
  };
</script>
<style scoped lang="less">
</style>
