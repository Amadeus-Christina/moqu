<template>
    <div class="cover-img">
        <div class="edit clear">
            <div class="text right" @click="changeMode">{{mode}}</div>
        </div>
        <span v-for="(item, index) in imgData" :key="index">
      <div class="img" :style="{backgroundImage: 'url('+item+')'}" v-if="item != ''">
        <van-checkbox v-model="checked[index]" checked-color="#23D2CD" v-if="mode == '取消'"></van-checkbox>
      </div>
    </span>
        <div class="sure" v-show="mode == '编辑'" @click="uploadImg">
            <input
                    type="file"
                    name="avatar"
                    id="uppic"
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    class="uppic"
                    v-on:change="upload($event)"
            >
            上传封面
        </div>
        <div
                class="sure red"
                v-show="mode == '取消'"
                :class="{'gray': checked.filter(item =>{ return item == true}).length == 0}"
                @click="del"
        >删 除
        </div>
    </div>
</template>
<script>
  import axios from 'axios'
  import {updateCoverImage} from '@/api/my/index.js'
  import {uploadFile} from '@/api/index/index.js'

  export default {
    components: {},
    mixins: [],
    name: '',
    data() {
      return {
        mode: '编辑',
        checked: [],
        remain: '',
        imgData: [],
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      // 获取图片数据
      getData() {
        this.imgData = this.$store.state.userInfo.coverImageList
      },
      // 切换 编辑/删除模式
      changeMode() {
        this.mode = this.mode === '编辑' ? '取消' : '编辑'
        this.checked = []
      },
      // 删除照片
      del() {
        let array = []
        let string = ''
        let flag = true
        this.imgData.filter((item, index) => {
          if (this.checked[index] != true) {
            array.push(item)
            if (flag == true) {
              string += item
              flag = false
            } else {
              string += ',' + item
            }
            this.remain = string
          }
          return array
        })
        this.imgData = array
        this.checked = []
        console.log('remain', this.remain)
        console.log(Object.prototype.toString.call(this.remain));
        updateCoverImage(this.$store.state.userInfo.userId, this.remain).then(res => {
          console.log(res)
        })
      },
      // 点击按钮触发上传按钮点击事件
      uploadImg() {
        let filesId = document.getElementById("uppic")
        filesId.click()
      },
      // 上传文件
      upload(ev) {
        let file = document.getElementById("uppic").files[0]
        // 上传操作
        console.log(file)
        let formData = new FormData();
        formData.append("file", file, "file_" + Date.parse(new Date()) + ".jpg");

        // const uploadUrl = `${this.$webUrl}/admin/adminUpload/upload`
        // axios({
        //   method: 'post',
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        //   url: uploadUrl,
        //   data: formData
        // }).then(res=>{
        //   console.log(res);
        // })

        uploadFile(this,formData).then(res => {
          this.imgData.push(res.data.data)
          if (this.remain.length == 0) {
            this.remain += res.data.data
          } else {
            this.remain += ',' + res.data.data
          }
          updateCoverImage(this.$store.state.userInfo.userId, this.remain).then(res => {
            console.log(res)
          })
        })
      }
    },
    mounted() {
      this.getData()
    },
    created() {
    },
    filters: {},
    directives: {},
    beforeDestroy() {
    },
    destroyed() {
    },
    updated() {
    }
  }
</script>
<style scoped lang="less">
    .cover-img {
        .edit {
            color: #444444;
            font-size: 0.28rem;
            height: 0.8rem;

            .text {
                line-height: 0.8rem;
                margin-right: 0.25rem;
            }
        }

        .img {
            display: inline-block;
            width: 2.23rem;
            height: 2.23rem;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            margin-left: 0.2rem;
            position: relative;
        }

        .select {
            position: absolute;
            right: 0;
        }

        .sure {
            text-align: center;
            line-height: 0.9rem;
            position: absolute;
            bottom: 1.5rem;
            left: 0.8rem;
            box-shadow: 0 0;

            &.red {
                background: #FD493E;
            }

            &.gray {
                background: #E3E3E3;
            }

            .uppic {
                display: none;
            }
        }
    }
</style>
<style lang="less">
    .cover-img {
        .van-checkbox__icon {
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
        }
    }

</style>
