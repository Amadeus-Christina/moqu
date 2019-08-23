<template>
  <div class="vehicle-manage">
    <div class="text">已认证车辆：</div>
    <div class="already">
      <vehicle-item v-for="(item,index) in vehicleList"
                    :key="index"
                    :index="index"
                    :item="item"
                    :activeIndex="activeIndex"
                    v-if="item.status === 'through'"
                    @changeActiveIndex="changeActiveIndex"
      />
    </div>
    <div class="text">待认证车辆：</div>
    <div class="noYet">
      <vehicle-item v-for="(item,index) in vehicleList" :key="index" :index="index" :item="item" v-if="item.status !== 'through'"/>
    </div>
  </div>
</template>
<script>
import vehicleItem from '@/components/VehicleItem'
export default {
  components: {
    vehicleItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      activeIndex: 0,
      vehicleList:[
        {
          logo: '../../static/images/vehicle/binli.png',
          model: '宾利 慕尚',
          area: '浙A',
          number:'SDF54',
          status: 'through'
        },
        {
          logo: '../../static/images/vehicle/falali.png',
          model: '法拉利 488',
          area: '浙A',
          number:'S284W',
          status: 'through'
        },
        {
          logo: '../../static/images/vehicle/benchi.png',
          model: '奔驰 G级',
          area: '浙A',
          number:'WD754',
          status: 'through'
        },
        {
          logo: '../../static/images/vehicle/Lamborghini.png',
          model: '兰博基尼 Aventador',
          area: '浙A',
          number:'51854',
          status: 'wait'
        },
        {
          logo: '../../static/images/vehicle/yingfeinidi.png',
          model: '英菲尼迪 QX50',
          area: '浙A',
          number:'SS8D4',
          status: 'notThrough'
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 切换 点击使用 正在使用 按钮状态
    changeActiveIndex(index) {
      this.activeIndex = index
    }
  },
  mounted () {},
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
