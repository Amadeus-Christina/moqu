<template>
  <div class="video-authentication-blank">
    <div class="text">请上传一段15秒以上的自我介绍视频：</div>
    <div class="video">
      <label id="labelr" class="pop_file" for="pop_video">
        <video id="videoId" autoplay muted loop></video>
        <input style="display: none;" id="pop_video" type="file" accept="audio/mp4,video/mp4"
               v-on:change="uploadFile($event)" name="fileTrans" ref="file" value=""/>
        <div class="prompt" v-if="showPrompt">点击更改视频</div>
      </label>
    </div>
    <div class="sure" @click="showToast" :disabled=!canSubmit :class="{'gray': canSubmit == false}">确认</div>
  </div>
</template>
<script>
  import {videoAuthentication} from '@/api/my/index.js'
  import { uploadImg } from "@/api/index/index.js";
  export default {
    components: {},
    mixins: [],
    name: '',
    data() {
      return {
        showPrompt: false,
        canSubmit: false,
        src: '',
        formData:null,
        video: '',
        picture: ''
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      upFile(that, formData) {
        return new Promise(resolve => {
          that.$toast.loading({
            duration: 0,
            forbidClick: true,
            loadingType: "spinner",
            message: "加载中..."
          });
          uploadImg(that, formData).then(res => {
            if (res.data.code == 0) {
              this.video = res.data.msg.split(',')[0]
              this.picture = res.data.msg.split(',')[1]
              // 视频认证申请
              videoAuthentication(this.video, this.$store.state.userInfo.userId, this.picture)
              that.$toast.clear();
            }
          });
        });
      },

      // 点击提交按钮
      showToast() {
        if (this.$data.canSubmit) {
          this.upFile(this,this.formData)
          this.$toast.success({
            message: "提交成功\n待审核",
          })
        }
      },
      // 上传文件
      uploadFile(ev){
        var that = this;
        var filesId = document.getElementById('pop_video');
        var videoId = document.getElementById('videoId');
        var url = getFileURL(filesId.files[0]); //把当前的 files[0] 传进去
        if(url) {
          videoId.src = url;
          this.showPrompt = true
          this.src = url
        }
        function getFileURL(file) {
          var getUrl = null;
          if(window.createObjectURL != undefined) { // basic
            getUrl = window.createObjectURL(file);
          } else if(window.URL != undefined) { // mozilla(firefox)
            getUrl = window.URL.createObjectURL(file);
          } else if(window.webkitURL != undefined) { // webkit or chrome
            getUrl = window.webkitURL.createObjectURL(file);
          }
          return getUrl;
        }
        var timer,tryTime,maxTry=5,delay=500;
        // 获取视频长度
        function getDuration() {
          if (!isNaN(videoId.duration)) {
            clearInterval(timer);
            if(Math.floor(videoId.duration) < 15) {
              that.$data.canSubmit = false
              that.$toast.fail({
                message: "视频长度不能少于15秒",
              })
            }else{
              // 视频上传操作
              that.$data.canSubmit = true
              let formData = new FormData();
              formData.append("file", filesId.files[0], "file_" + Date.parse(new Date()) + ".mp4");
              that.formData = formData
              // that.upFile(that,formData).then(res => {
              //   console.log('upFile-res',res)f
              // })
            }
          }
          else {
            tryTime++;
            //超过获取视频长度最大重试次数
            if (tryTime >= maxTry) { clearInterval(timer); alert('无法获取视频长度！');}
          }
        }
        //视频长度计时器
        function setVideoSrc(f) {
          clearInterval(timer);
          var url = URL.createObjectURL(f.files[0]);
          videoId.src = url;
          tryTime = 0;
          timer = setInterval(getDuration, delay);
        }
        setVideoSrc(filesId)
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
  .video-authentication-blank {
    display: flex;
    flex-direction: column;
    align-items: center;

    .text {
      color: #333333FF;
      font-size: 0.32rem;
      font-weight: 400;
      margin: 0.4rem 0;
    }

    .video {
      height: 3.5rem;
      width: 6.2rem;
      background-image: url("../../../../../static/images/video-authentication/upload.png");
      background-size: 6.2rem 3.5rem;
      background-position: center center;
      position: relative;
      .pop_file {
        height: 3.2rem;
        width: 6rem;
        display: block;
        position: relative;
      }

      .pop_file video {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
      }
      .prompt{
        width: 6rem;
        height: 0.6rem;
        background:rgba(0,0,0,0.4);
        font-size: 0.24rem;
        color: #ffffff;
        z-index: 200;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -0.17rem;
      }
    }
    .sure {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 2rem;
      &.gray{
        background: #E3E3E3;
        box-shadow: 0 0;
      }
    }
  }
</style>
