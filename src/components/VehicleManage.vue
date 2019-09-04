<template>
  <div class="vehicle-manage">
    <div class="text">已认证车辆：</div>
    <div class="already">
      <vehicle-item v-for="(item,index) in haveAuthenticationList"
                    :key="index"
                    :item="item"
                    @changeActiveIndex="changeActiveIndex"
      />
    </div>
    <div class="text">待认证车辆：</div>
    <div class="noYet">
      <vehicle-item v-for="(item,index) in noAuthentication" :key="index" :item="item"/>
    </div>
  </div>
</template>
<script>
import vehicleItem from '@/components/VehicleItem'
import {myCarManagement, userOrCancel} from '@/api/my/index.js'
export default {
  components: {
    vehicleItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      haveAuthenticationList: [],
      noAuthentication: []
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 切换 点击使用 正在使用 按钮状态
    changeActiveIndex(userCarMedalId) {
      userOrCancel (userCarMedalId).then(res => {
        if (res.code == 10456) {
          this.$toast.fail(res.msg)
        } else {
          this.getData ()
        }
      })
    },
    getData () {
      myCarManagement(this.$store.state.userInfo.userId).then(res => {
        this.haveAuthenticationList = res.data.HaveAuthentication
        this.noAuthentication = res.data.noAuthentication
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
  .already,
  .noYet{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
  .text{
    margin: 0.4rem auto;
    margin-left: 0.3rem;
  }
  .vehicle-manage{
    color: #333333;
    font-size: 0.32rem;
    margin-bottom: 1.2rem;
  }

</style>
