<template>
  <div class="documents">
    <div class="page1" v-show="page == 1">
      <documents-item v-for="(item,index) in info" :key="index" :item="item" @add="add" @deleteUpload="deleteUpload"/>
<!--      <div class="sure" @click="showToast">提交</div>-->
      <div class="sure" @click="nextStep">下一步</div>
    </div>
    <div class="page2" v-show="page == 2">
      <select-simulation :data="allCarMedal" @selectVal="changeCarMedalId" :placeholder="'请输入车辆品牌'" :isCar="true"/>
      <input v-model="carModel" type="text" class="border" placeholder="请输入车辆型号">
      <div class="sure" @click="showToast">提交</div>
    </div>
  </div>
</template>
<script>
import selectSimulation from '@/components/selectSimulation'
import documentsItem from '@/components/DocumentsItem'
import {uploadFile} from '@/api/index/index.js'
import {carAuthentication, findAllCarMedal, againAuthentication} from '@/api/my/index.js'
export default {
  components: {
    documentsItem,
    selectSimulation
  },
  mixins: [],
  name: '',
  data () {
    return {
      page: 1,
      uploadList: [],
      // 传入的info
      info: [
        {
          title: '身份证正面',
          name: 'frontCardPhone',
          imgSrc: '../../static/images/vehicle/idcard.png',
          msg: '请上传身份证正面照片'
        },
        {
          title: '行驶证正面（蓝本）',
          name: 'frontDrivingCard',
          imgSrc: '../../static/images/vehicle/Vehiclelicense.png',
          msg: '请上传行驶证正面照片'
        },
        {
          title: '行驶证背面（蓝本）',
          name: 'backDrivingCard',
          imgSrc: '../../static/images/vehicle/VehiclelicenseI.png',
          msg: '请上传行驶证反面照片'
        },
        {
          title: '车辆正面照片（车牌清晰）',
          name: 'frontLicensePlatePhone',
          imgSrc: '../../static/images/vehicle/car.png',
          msg: '请上传车辆正面照片'
        }
      ],
      // 原本的info
      originalInfo: [
        {
          title: '身份证正面',
          name: 'frontCardPhone',
          imgSrc: '../../static/images/vehicle/idcard.png',
          msg: '请上传身份证正面照片'
        },
        {
          title: '行驶证正面（蓝本）',
          name: 'frontDrivingCard',
          imgSrc: '../../static/images/vehicle/Vehiclelicense.png',
          msg: '请上传行驶证正面照片'
        },
        {
          title: '行驶证背面（蓝本）',
          name: 'backDrivingCard',
          imgSrc: '../../static/images/vehicle/VehiclelicenseI.png',
          msg: '请上传行驶证反面照片'
        },
        {
          title: '车辆正面照片（车牌清晰）',
          name: 'frontLicensePlatePhone',
          imgSrc: '../../static/images/vehicle/car.png',
          msg: '请上传车辆正面照片'
        }
      ],
      allCarMedal: null,
      frontCardPhone: null,
      frontDrivingCard: null,
      backDrivingCard: null,
      frontLicensePlatePhone: null,
      carMedalId: null,
      carModel: null,
      // 重新申请车辆信息
      carAuthenticationId: null,
    }
  },
  props: ['carId'],
  computed: {},
  watch: {},
  methods: {
    // 添加上传的文件到数组中
    add(file){
      this.uploadList.push(file)
      let formData = new FormData();
      formData.append("file", file.file, "file_" + Date.parse(new Date()) + ".jpg");
      uploadFile(this, formData).then(res => {
        if (file.name == 'frontCardPhone'){
          this.frontCardPhone = res.data.data
        }
        if (file.name == 'frontDrivingCard'){
          this.frontDrivingCard = res.data.data
        }
        if (file.name == 'backDrivingCard'){
          this.backDrivingCard = res.data.data
        }
        if (file.name == 'frontLicensePlatePhone'){
          this.frontLicensePlatePhone = res.data.data
        }
      })
    },
    // 显示提交成功提示
    showToast() {
      if(this.uploadList.length >= 4 && this.carMedalId != null && this.carModel != null){
        carAuthentication(this.frontCardPhone, this.frontDrivingCard, this.backDrivingCard, this.frontLicensePlatePhone,
                this.$store.state.userInfo.userId, this.carMedalId, this.carModel, this.carAuthenticationId).then(res => {
          if (res.code == 200) {
            this.$toast.success({
              message: '提交成功\n待审核'
            })
            this.info = this.originalInfo
            this.carAuthenticationId = null
          } else {
            this.$toast.fail({
              message: res.msg
            })
          }

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
      if (this.uploadList.length >= 4) {
        this.page = 2
      } else {
        this.$toast.fail({
          message: '材料不足'
        })
      }
    },
    // 改变车辆品牌
    changeCarMedalId (val) {
      this.carMedalId = val.carMedalId
      console.log(this.carMedalId);
    },
    // 获取所有车辆信息
    getAllCarMedal(){
      findAllCarMedal().then(res => {
        this.allCarMedal = res.data
      })
    },
    // 获取重新认证车辆的信息
    getCarAgain(){
      if(this.carId){
        againAuthentication(this.carId).then(res =>{
          console.log(res)
          this.carAuthenticationId = res.data.carAuthenticationId
          this.frontCardPhone = res.data.frontCardPhone
          this.frontDrivingCard = res.data.frontDrivingCard
          this.backDrivingCard = res.data.backDrivingCard
          this.frontLicensePlatePhone = res.data.frontLicensePlatePhone
          this.uploadList.push(res.data.frontCardPhone)
          this.uploadList.push(res.data.frontDrivingCard)
          this.uploadList.push(res.data.backDrivingCard)
          this.uploadList.push(res.data.frontLicensePlatePhone)
          this.info[0].imgSrc = res.data.frontCardPhone
          this.info[1].imgSrc = res.data.frontDrivingCard
          this.info[2].imgSrc = res.data.backDrivingCard
          this.info[3].imgSrc = res.data.frontLicensePlatePhone

          if(res.data.frontCardPhoneStatus == '0'){
            this.info[0].msg = '认证成功'
          } else {
            this.info[0].msg = '请重新上传身份证正面照片'
            this.info[0].msgRed = true
          }

          if(res.data.frontDrivingCardStatus == '0'){
            this.info[1].msg = '认证成功'
          } else {
            this.info[1].msg = '请重新上传行驶证正面照片'
            this.info[1].msgRed = true
          }

          if(res.data.backDrivingCardStatus == '0'){
            this.info[2].msg = '认证成功'
          } else {
            this.info[2].msg = '请重新上传行驶证反面照片'
            this.info[2].msgRed = true
          }

          if(res.data.frontLicensePlatePhoneStatus == '0'){
            this.info[3].msg = '认证成功'
          } else {
            this.info[3].msg = '请重新上传车辆正面照片'
            this.info[3].msgRed = true
          }
        })
      }
    }
  },
  mounted () {
    this.getAllCarMedal()
    this.getCarAgain()
  },
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
