<template>
    <div class="identity">
        <div class="page1" v-show="page == 1">
            <input v-model="identityIdentification" type="text" class="border" placeholder="请输入身份标识">
            <input v-model="realName" type="text" class="border" placeholder="请输入真实姓名">
            <input v-model="telephone" type="text" class="border" placeholder="请输入手机号码">
            <input v-model="IDCard" type="text" class="border" placeholder="请输入身份证号码">
            <div class="sure" @click="nextStep">下一步</div>
        </div>
        <div class="page2" v-show="page == 2">
            <documents-item v-for="(item,index) in info" :key="index" :item="item" @add="add" @deleteUpload="deleteUpload"/>
            <div class="sure" @click="nextStep">提交</div>
        </div>
    </div>
</template>
<script>
  import {identityAuthentication} from '@/api/my/index.js'
  export default {
    components: {},
    mixins: [],
    name: '',
    data() {
      return {
        page: 1,
        uploadList: [],
        info: [
          {
            title: '职业证明材料',
            name: 'frontCardPhone',
            imgSrc: '../../static/images/account-info/zhiyezhengming.png',
            msg: '请上传职业证明材料'
          },
          {
            title: '身份证正面',
            name: 'frontDrivingCard',
            imgSrc: '../../static/images/vehicle/Vehiclelicense.png',
            msg: '请上传身份证正面照片'
          },
          {
            title: '身份证反面',
            name: 'backDrivingCard',
            imgSrc: '../../static/images/vehicle/VehiclelicenseI.png',
            msg: '请上传身份证反面照片'
          },
          {
            title: '手持身份证',
            name: 'frontLicensePlatePhone',
            imgSrc: '../../static/images/vehicle/car.png',
            msg: '请上传手持身份证照片'
          }
        ],
        identityIdentification: null,
        realName: null,
        telephone: null,
        IDCard: null,

      }
    },
    props: [],
    computed: {},
    watch: {},
    methods: {
      // 进入下一步
      nextStep () {
        if (this.identity != null && this.name != null && this.phone != null && this.IDCard != null ) {
          this.page = 2
        } else {
          this.$toast.fail({
            message: '材料不足'
          })
        }
      },
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
    },
    mounted() {
    },
    created() {
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
    .identity{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.4rem;
        position: relative;
        .border {
            font-size: 0.28rem;
            width: 6rem;
            height: 0.9rem;
            border: 1px solid #E5E5E5;
            border-radius: 0.18rem;
            padding-left: 0.4rem;
            margin-bottom: 0.4rem;
        }
        .sure {
            line-height: 0.9rem;
            text-align: center;
            position: absolute;
            bottom: 1.5rem;
        }
    }
</style>
