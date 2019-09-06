<template>
  <div class="recruit fillcontain">
    <div class="group" v-for="(item, index) in recruitData" :key="index">
      <div class="wrap">
        <div class="head-img" :style="{backgroundImage: 'url('+item.headImg+')'}"></div>
        <div class="name">{{item.realNickName}}</div>
        <div class="status online" v-if="item.whetherOnline == 1">在线</div>
        <div class="status offline" v-else>{{item.offlineTime}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {queryMyPromotion} from '@/api/my/index.js'
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      recruitList: [
        {
          headImg: '../../../../../static/images/mock/01.jpg',
          realNickName: '带带',
          online: true,
          time: '3小时'
        },
        {
          headImg: '../../../../../static/images/mock/02.jpg',
          realNickName: '什么鬼',
          online: false,
          time: '15小时'
        }
      ],
      recruitData: null
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    getData () {
      queryMyPromotion(this.$store.state.userInfo.userId).then(res => {
        this.recruitData = res.data
      })
    }
  },
  mounted () {
    this.getData()
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .recruit{
    background: #F7F7F7;
    .group{
      height: 1.4rem;
      width: 100%;
      background: #FFFFFF;
      .wrap{
        height: 100%;
        width: 7rem;
        margin: 0 auto;
        border-bottom: 1px solid #F7F7F7;
        display: flex;
        align-items: center;
        position: relative;
        .head-img{
          height: 0.8rem;
          width: 0.8rem;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          border-radius: 50%;
        }
        .name{
          margin-left: 0.3rem;
          color: #666666;
          font-size: 0.28rem;
          font-weight: 400;
        }
        .status{
          font-size: 0.24rem;
          font-weight: 400;
          position: absolute;
          right: 0;
          &.online{
            color: #23D2CD;
          }
          &.offline{
            color: #999999;
          }
        }
      }
    }
  }
</style>
