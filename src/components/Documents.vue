<template>
  <div class="">
    <documents-item v-for="(item,index) in info" :key="index" :item="item" @add="add" @deleteUpload="deleteUpload"/>
    <div class="sure" @click="showToast">提交</div>
  </div>
</template>
<script>
import documentsItem from '@/components/DocumentsItem'
export default {
  components: {
    documentsItem
  },
  mixins: [],
  name: '',
  data () {
    return {
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
      ]
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
      if(this.uploadList.length >= 5){
        this.$toast.success({
          message: '提交成功\n待审核'
        })
      }
    },
    // 在上传列表中删除图片
    deleteUpload(fileName) {
      console.log(fileName)
      console.log('before: ',this.uploadList)
      this.uploadList = this.uploadList.filter((item) => {
        return item.name != fileName
      })
      console.log('after: ',this.uploadList)
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
</style>
