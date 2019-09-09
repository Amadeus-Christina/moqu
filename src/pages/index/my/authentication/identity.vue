<template>
    <div class="identity">
        <div class="page1" v-show="page == 1">
            <input v-model="identityIdentification" type="text" class="border" placeholder="请输入身份标识">
            <input v-model="realName" type="text" class="border" placeholder="请输入真实姓名">
            <input v-model="telephone" type="text" class="border" placeholder="请输入手机号码">
            <input v-model="IDCard" type="text" class="border" placeholder="请输入身份证号码" @blur="checkIDCard">
            <div class="sure" @click="nextStep">下一步</div>
        </div>
        <div class="page2" v-show="page == 2">
            <input v-model="position" type="text" class="border" placeholder="请输入职位/称呼">
            <documents-item v-for="(item,index) in info" :key="index" :item="item" @add="add" @deleteUpload="deleteUpload"/>
            <div class="sure" @click="showToast">提交</div>
        </div>
    </div>
</template>
<script>
  import documentsItem from '@/components/DocumentsItem'
  import {identityAuthentication} from '@/api/my/index.js'
  import {uploadFile} from '@/api/index/index.js'
  import professionalIcon from '#/account-info/zhiyezhengming.png'
  import frontCardIcon from '#/account-info/idcard.png'
  import backCardIcon from '#/account-info/Reverse of id card.png'
  import handCardIcon from '#/account-info/Hand-helidcard.png'
  export default {
    components: {
      documentsItem
    },
    mixins: [],
    name: '',
    data() {
      return {
        page: 1,
        uploadList: [],
        info: [
          {
            title: '职业证明材料',
            name: 'professionalCertificate',
            imgSrc: professionalIcon,
            msg: '请上传职业证明材料'
          },
          {
            title: '身份证正面',
            name: 'frontCard',
            imgSrc: frontCardIcon,
            msg: '请上传身份证正面照片'
          },
          {
            title: '身份证反面',
            name: 'backCard',
            imgSrc: backCardIcon,
            msg: '请上传身份证反面照片'
          },
          {
            title: '手持身份证',
            name: 'handCard',
            imgSrc: handCardIcon,
            msg: '请上传手持身份证照片'
          }
        ],
        identityIdentification: null,
        realName: null,
        telephone: null,
        IDCard: null,
        position: null,
        professionalCertificate: null,
        frontCard: null,
        backCard: null,
        handCard: null
      }
    },
    props: [],
    computed: {},
    watch: {},
    methods: {
      // 进入下一步
      nextStep () {
        if (this.identityIdentification != null && this.realName != null && this.telephone != null && this.IDCard != null) {
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
          if (file.name == 'professionalCertificate'){
            this.professionalCertificate = res.data.data
          }
          if (file.name == 'frontCard'){
            this.frontCard = res.data.data
          }
          if (file.name == 'backCard'){
            this.backCard = res.data.data
          }
          if (file.name == 'handCard'){
            this.handCard = res.data.data
          }
        })
      },
      // 显示提交成功提示
      showToast() {
        if(this.uploadList.length >= 4 && this.position != null){
          identityAuthentication(this.identityIdentification, this.realName, this.telephone, this.$store.state.userInfo.userId, this.IDCard, this.position,
            this.professionalCertificate, this.frontCard, this.backCard, this.handCard).then(res => {
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
      // 输入框失去焦点验证身份证格式
      checkIDCard() {
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!idcardReg.test(this.IDCard)) {
          this.$toast.fail('身份证格式不正确')
          this.IDCard = null
        }
      }
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
        position: relative;
        .page1,
        .page2{
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 0.4rem;
        }
        .border {
            font-size: 0.28rem;
            width: 6rem;
            min-height: 0.9rem;
            border: 1px solid #E5E5E5;
            border-radius: 0.18rem;
            padding-left: 0.4rem;
            margin-bottom: 0.4rem;
            line-height: 0.9rem;
        }
        .page1 .sure {
            line-height: 0.9rem;
            text-align: center;
            position: absolute;
            bottom: 0.5rem;
        }
        .page2 .sure {
            margin: 1rem auto 0.5rem;
            line-height: 0.9rem;
            text-align: center;
        }
    }
</style>
