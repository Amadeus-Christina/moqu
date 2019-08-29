<template>
  <div class="sunrise-learn-more">
    <div class="table">
      <div class="title">
        <div>推广人数</div>
        <div>对应等级</div>
        <div>会员权益</div>
      </div>
      <div class="content-wrap">
        <div class="content" v-for="(item, index) in tableData" :key="index">
          <div class="person-num">{{item.personNum}}</div>
          <div class="lv">LV{{item.lv}}合伙人</div>
          <div v-if="item.recruit == 0" class="recruit">无返利</div>
          <div v-else class="recruit">返利{{item.recruit}}%</div>
        </div>
      </div>
    </div>
    <div class="text">推广人数越多奖励返利比例越大哦～</div>
    <div class="sure">立即分享</div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
      tableData: [
        {
          personNum: '0～5',
          lv: '1',
          recruit: 0
        },
        {
          personNum: '5～50',
          lv: '2',
          recruit: 5
        },
        {
          personNum: '50～100',
          lv: '3',
          recruit: 6
        },
        {
          personNum: '100～500',
          lv: '4',
          recruit: 7
        },
        {
          personNum: '500以上',
          lv: '5',
          recruit: 10
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
  .sunrise-learn-more{
    height: 100%;
    width: 100%;
    background-color: #F7F7F7;
    .table{
      width: 6.9rem;
      padding-top: 0.4rem;
      margin: 0 auto;
      .title{
        display: flex;
        justify-content:space-around;
        align-items: center;
        background-color: #23D2CD;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 0.32rem;
        height: 1rem;
        border-radius: 0.2rem 0.2rem 0 0;
      }
      .content-wrap{
        display: flex;
        flex-direction: column;
        color: #666666;
        font-size: 0.28rem;
        font-weight: 400;
        background-color: #FFFFFF;
        border-radius: 0 0 0.2rem 0.2rem;
        border: 1px solid #DDDDDD;
        border-top: 0;
        .content{
          display: flex;
          height: 1rem;
          .person-num,
          .lv,
          .recruit{
            width: 2.3rem;
            text-align: center;
            line-height: 1rem;
            border-top: 1px solid #DDDDDD;
          }
          .lv{
            border-left: 1px solid #DDDDDD;
            border-right: 1px solid #DDDDDD;
          }
          &:last-child {
            border-radius: 0 0 0.2rem 0.2rem;
          }
        }
      }
    }
    .text{
      font-size: 0.24rem;
      color: #999999;
      text-align: center;
      margin-top: 0.4rem;
    }
    .sure{
      text-align: center;
      line-height: 0.9rem;
      /*margin-top: 0.5rem;*/
      position: absolute;
      bottom: 1.5rem;
      left: 0.8rem;
    }
  }
</style>
