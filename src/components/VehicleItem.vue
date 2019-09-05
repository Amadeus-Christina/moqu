<template>
  <div class="vehicle-item">
    <img class="img" :src="item.carMedalUrl" alt="">
    <div class="model">{{item.carModel}}</div>
    <div class="car-number">{{item.carNum.substring(0, 2)}} · {{item.carNum.substring(2)}}</div>
    <div class="btn" :class="{'green': item.type == '0'}" @click="$emit('changeActiveIndex',item.userCarMedalId)">
      <div v-if="item.type == '0'">正在使用</div>
      <div v-else-if="item.type == '1'">点击使用</div>
      <div v-else-if="item.status === '0'">标签待定</div>
      <div v-else @click="again(item.carAuthenticationId)">重新认证</div>
    </div>
    <div class="right-top"
         :class="{'through': item.type,'notThrough': item.status === '2','wait': item.status === '0'}"
    ></div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {}
  },
  props: ['item','index','activeIndex'],
  computed: {},
  watch: {},
  methods: {
    // 重新申请认证
    again(carAuthenticationId) {
      this.$emit('again',carAuthenticationId)
    }
  },
  mounted () {
  },
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .vehicle-item{
    height: 3.75rem;
    width: 3.3rem;
    box-shadow:0px 0px 30px 0px rgba(213,213,213,0.4);
    border-radius:20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 0.4rem;
    margin-left: 0.3rem;
    position: relative;
    .img{
      height: 1rem;
      width: 1rem;
      margin: 0.4rem auto 0;
    }
    .model{
      margin: 0.2rem auto 0.1rem;
    }
    .car-number{
      width: 2.2rem;
      height: 0.5rem;
      border-radius: 0.1rem;
      background-color: #007BFF;
      text-align: center;
      line-height: 0.5rem;
      color: #FFFFFF;
      margin: 0 auto 0.3rem;
      font-weight:400;
    }
    .btn{
      width:1.56rem;
      height: 0.5rem;
      border: 1px solid #999999;
      border-radius: 0.25rem;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.24rem;
      color: #999999;
      margin: 0 auto 0.3rem;
      &.green{
        background: #23D2CD;
        border: none;
        color: #FFFFFF;
      }
    }
    .right-top{
      width: 1.25rem;
      height: 0.98rem;
      background-size: 1.25rem 0.98rem;
      background-position: center center;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      right: 0;
      &.through{
        background-image: url("../../static/images/vehicle/through.png");
      }
      &.notThrough{
        background-image: url("../../static/images/vehicle/Notthrough.png");
      }
      &.wait{
        background-image: url("../../static/images/vehicle/wait.png");
      }
    }
  }

</style>
