<template>
  <div class="documents">
    <div class="page1" v-show="page == 1">
      <documents-item v-for="(item,index) in info" :key="index" :item="item" @add="add" @deleteUpload="deleteUpload"/>
<!--      <div class="sure" @click="showToast">提交</div>-->
      <div class="sure" @click="nextStep">下一步</div>
    </div>
    <div class="page2" v-show="page == 2">
      <select-simulation :data="vehicleBrand" @selectVal="changeBrand" :placeholder="'请输入车辆品牌'"/>
      <input v-model="type" type="text" class="border" placeholder="请输入车辆型号">
      <div class="sure" @click="showToast">提交</div>
    </div>
  </div>
</template>
<script>
import selectSimulation from '@/components/selectSimulation'
import documentsItem from '@/components/DocumentsItem'
export default {
  components: {
    documentsItem,
    selectSimulation
  },
  mixins: [],
  name: '',
  data () {
    return {
      brand: null,
      type: null,
      page: 1,
      uploadList: [],
      info: [
        {
          title: '身份证正面',
          name: 'IDCard',
          imgSrc: '../../static/images/vehicle/idcard.png',
          msg: '请上传身份证正面照片'
        },
        {
          title: '驾驶证正面（黑本）',
          name: 'drivingLicense',
          imgSrc: '../../static/images/vehicle/driving.png',
          msg: '请上传驾驶证正面照片'
        },
        {
          title: '行驶证正面（蓝本）',
          name: 'vehicleLicenseFront',
          imgSrc: '../../static/images/vehicle/Vehiclelicense.png',
          msg: '请上传行驶证正面照片'
        },
        {
          title: '行驶证背面（蓝本）',
          name: 'vehicleLicenseBehind',
          imgSrc: '../../static/images/vehicle/VehiclelicenseI.png',
          msg: '请上传行驶证反面照片'
        },
        {
          title: '车辆正面照片（车牌清晰）',
          name: 'vehiclePhoto',
          imgSrc: '../../static/images/vehicle/car.png',
          msg: '请上传车辆正面照片'
        }
      ],
      vehicleBrand: ['宾利','法拉利','劳斯莱斯'],
      brand: null
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {
    // 添加上传的文件到数组中
    add(file){
      this.uploadList.push(file)
    },
    // 显示提交成功提示
    showToast() {
      if(this.brand != null && this.type != null){
        this.$toast.success({
          message: '提交成功\n待审核'
        })
      } else {
        this.$toast.fail('材料不足')
      }
    },
    // 在上传列表中删除图片
    deleteUpload(fileName) {
      console.log(fileName)
      this.uploadList = this.uploadList.filter((item) => {
        return item.name != fileName
      })
    },
    // 进入下一步
    nextStep () {

      if (this.uploadList.length >= 5) {
        this.page = 2
      } else {
        this.$toast.fail({
          message: '材料不足'
        })
      }
    },
    changeBrand (val) {
      this.brand = val
      console.log(val);
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
  .sure{
    margin: 0.8rem auto 2rem;
    text-align: center;
    line-height: 0.9rem;
  }
  .page2{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.4rem;
    .border{
      font-size: 0.28rem;
      width: 6rem;
      height: 0.9rem;
      border: 1px solid #E5E5E5;
      border-radius: 0.18rem;
      padding-left: 0.4rem;
      margin-bottom: 0.4rem;
      margin-top: 0.4rem;
    }
    .sure{
      position: absolute;
      text-align: center;
      line-height: 0.9rem;
      bottom: 0;
    }
  }

</style>
