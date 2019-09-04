<template>
    <div class="ID">
        <input v-model="name" type="text" class="name border" placeholder="请输入姓名">
        <select-simulation :data="sexdata" @selectVal="changeSex" :placeholder="'请输入性别'"/>
        <div class="select" @click="showDatePicker">
            <input v-model="age" class="input" type="text" placeholder="请选择年龄">
            <img class="img" src="/static/images/account-info/jiantouxia.png" alt="">
        </div>
        <van-datetime-picker
                v-model="currentDate"
                type="date"
                v-show="showDate"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirmDate"
                @cancel="showDatePicker"
        />
        <input v-model="IDcard" type="text" class="IDcard border" placeholder="请输入身份证号" @blur="checkIDCard">
        <documents-item v-for="(item,index) in info" :key="index" :item="item" @add="add" @deleteUpload="deleteUpload"/>
        <div class="sure" @click="showToast">提交</div>
    </div>
</template>
<script>
  import documentsItem from '@/components/DocumentsItem'
  import selectSimulation from '@/components/selectSimulation'
  import {jsGetAge} from '@/utils/main.js'
  import {realNameAuthentication} from '@/api/accountInfo/authentication.js'
  import {uploadFile} from '@/api/index/index.js'
  export default {
    components: {
      selectSimulation,
      documentsItem
    },
    mixins: [],
    name: '',
    data() {
      return {
        name: null,
        sexdata: ['男', '女'],
        sexSelected: null,
        age: null,
        IDcard: null,
        showDate: false,
        minDate: new Date(1900, 1, 1),
        maxDate: new Date(2090, 1, 1),
        currentDate: new Date(2000, 1, 1),
        info: [
          {
            title: '身份证正面',
            name: 'frontCard',
            imgSrc: '/static/images/account-info/idcard.png',
            msg: '请上传身份证正面照片',
          },
          {
            title: '身份证反面',
            name: 'backCard',
            imgSrc: '/static/images/account-info/Reverse of id card.png',
            msg: '请上传身份证反面照片',
          },
          {
            title: '手持身份证',
            name: 'handCard',
            imgSrc: '/static/images/account-info/Hand-helidcard.png',
            msg: '请上传手持身份证照片',
          }
        ],
        frontCard: null,
        backCard: null,
        handCard: null,
        uploadList: [],
      }
    },
    props: [],
    computed: {},
    watch: {},
    methods: {
      // 更新性别
      changeSex(val) {
        if (val == '男') {
          this.sexSelected = 1
        }
        if (val == '女') {
          this.sexSelected = 2
        }
        console.log(this.sexSelected);
      },
      // 时间选择显示 / 隐藏
      showDatePicker() {
        this.showDate = !this.showDate
      },
      // 点击确认按钮
      confirmDate(value) {
        let date = new Date(value);
        let birthday =
          date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let age = jsGetAge(birthday);
        if (age == -1) {
          this.showDate = !this.showDate
          this.$toast.fail('出生日期不能超过当前时间')
        } else {
          this.age = age
          this.currentDate = date
          this.showDate = !this.showDate
        }
      },
      // 添加上传的文件到数组中
      add(file) {
        this.uploadList.push(file)
        let formData = new FormData();
        formData.append("file", file.file, "file_" + Date.parse(new Date()) + ".jpg");
        uploadFile(this, formData).then(res => {
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
      // 在上传列表中删除图片
      deleteUpload(fileName) {
        console.log(fileName)
        this.uploadList = this.uploadList.filter((item) => {
          return item.name != fileName
        })
      },
      uploadImg () {

      },
      // 提交信息
      showToast() {
        if (this.name != null && this.sexSelected != null && this.age != null && this.IDcard != null && this.uploadList.length >= 3) {
          realNameAuthentication(this.name, this.sexSelected, this.age, this.IDcard,this.frontCard, this.backCard, this.handCard,this.$store.state.userInfo.userId).then(res => {
            console.log(res)
          })
          this.$toast.success({
            message: '提交成功\n待审核'
          })
        } else {
          this.$toast.fail('材料不足')
        }
      },
      // 输入框失去焦点验证身份证格式
      checkIDCard() {
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!idcardReg.test(this.IDcard)) {
          this.$toast.fail('身份证格式不正确')
          this.IDcard = null
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
    },
  }
</script>
<style scoped lang="less">
    .ID {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.4rem;

        .border {
            font-size: 0.28rem;
            width: 6rem;
            height: 0.9rem;
            border: 1px solid #E5E5E5;
            border-radius: 0.18rem;
            padding-left: 0.4rem;
            margin-bottom: 0.4rem;
        }

        .select {
            font-size: 0.28rem;
            width: 6rem;
            height: 0.9rem;
            border: 1px solid #E5E5E5;
            border-radius: 0.18rem;
            padding-left: 0.4rem;
            position: relative;
            line-height: 0.8rem;
            margin: 0.4rem auto;

            .input {
                border: none;
                outline: none;
                width: 90%;
            }

            .img {
                max-height: 0.4rem;
                position: absolute;
                right: 0.4rem;
                top: 0.2rem;
            }
        }

        .sure {
            margin: 0.8rem auto 1.7rem;
            line-height: 0.9rem;
            text-align: center;
        }
    }
</style>
<style lang="less">
    .ID {
        .van-picker {
            width: 6rem;
        }
    }
</style>
