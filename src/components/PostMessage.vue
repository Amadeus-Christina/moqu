<template>
  <div class="post-message">
    <section class="pm-header">
      <div @click="$router.push('location')">
        <img src="../../static/images/home/location.png" />
        <span>{{positioning.city+positioning.area||(positioning.addressComponents&&(positioning.addressComponents.city+positioning.addressComponents.district))||'你在哪里'}}</span>
      </div>
      <div class="choose">
        <van-checkbox v-model="stickChecked">
          <span class="radio-text">黑卡置顶</span>
          <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive" />
        </van-checkbox>
        <van-checkbox v-model="nickNameChecked">
          <span class="radio-text">匿名发布</span>

          <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.inactive" />
        </van-checkbox>
      </div>
    </section>
    <section class="pm-bottom">
      <div class="pm-tab">
        <div v-for="(item,index) in tabIcon" :key="index" @click="chanceTab(index)">
          <img :src="active==index?item.activeIcon:item.icon" />
          <input
            type="file"
            name="file"
            multiple="multiple"
            v-if="index==0||index==3"
            @change="inputFile(index,$event)"
            :accept="index==0?'image/*':'video/*'"
          />
        </div>
      </div>
      <div class="pm-content" v-if="active==2">
        <section class="time">{{times}}s</section>
        <section class="record">
          <img
            v-show="recordStatus==2"
            src="../../static/images/home/cancel.png"
            class="record-button cancel"
            @click="cancelRecording"
          />
          <img
            :src="recordStatus==0?Therecording:recordStatus==1?Clickonthevoice:suspended"
            alt
            class="before-recording"
            @click="clickRecording"
          />
          <img
            v-show="recordStatus==2"
            src="../../static/images/home/determine.png"
            class="record-button confirm"
            @click="confirmRecording"
          />
          <p>点击录音</p>
        </section>
      </div>
    </section>
    <section v-if="modalShow">
      <van-overlay :show="modalShow" @click="choseModal"></van-overlay>
      <div class="pm-modal">
        <header class="pm-modal-header">
          悬 赏
          <img src="../../static/images/home/Shutdown.png" @click="modalShow=false" />
        </header>
        <section class="pm-modal-input">
          <input type="text" placeholder="请输入" v-model="money"/>
          <i>
            <img src="../../static/images/home/diamondI.png" />
          </i>
        </section>
        <button>确定</button>
      </div>
    </section>
  </div>
</template>
<script>
import unchecked from "#/home/uncheck.png";
import theSelected from "#/home/Theselected.png";
import photo from "#/home/photo.png";
import photoI from "#/home/photoI.png";
import aet from "#/home/@.png";
import aetI from "#/home/@II.png";
import voice from "#/home/voice.png";
import voiceI from "#/home/voiceI.png";
import video from "#/home/video.png";
import videoI from "#/home/videoI.png";
import amountof from "#/home/amountof.png";
import Therecording from "#/home/Therecording.png";
import Clickonthevoice from "#/home/Clickonthevoice.png";
import suspended from "#/home/suspended.png";
import "@/utils/recoder.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      stickChecked: false,
      nickNameChecked: false,
      icon: {
        active: theSelected,
        inactive: unchecked
      },
      tabIcon: [
        {
          icon: photo,
          activeIcon: photoI
        },
        {
          icon: aet,
          activeIcon: aetI
        },
        {
          icon: voice,
          activeIcon: voiceI
        },
        {
          icon: video,
          activeIcon: videoI
        },
        {
          icon: amountof,
          activeIcon: amountof
        }
      ],
      active: 2,
      Therecording,
      Clickonthevoice,
      suspended,
      recordStatus: 0,
      modalShow: false,
      times: 0,
      countTimes: "",
      audio: "",
      audioBlob: "",
      money:''
    };
  },
  computed: {
    ...mapState(["positioning"])
  },
  mounted() {
    console.log(this.positioning);
  },
  methods: {
    // 上传文件
    inputFile(index, event) {
      // console.log(event.target.files);
      // console.log(index);
      let FileList = event.target.files;
      console.log(FileList);
      if (index == 0) {
        this.$emit("listenImg", FileList);
      } else if (index == 3) {
        this.$emit("listenVideo", FileList);
      }
      // index为0，上传图片 index为3，上传视频
    },
    // 确认音乐
    confirmRecording() {
      this.$emit("listenRecording", this.audioBlob);
    },
    chanceTab(index) {
      this.active = index;
      if (index == 1) {
        this.$router.push("contact");
      } else if (index == 4) {
        this.modalShow = true;
      }
    },
    // 点击按钮
    clickRecording() {
      let { recordStatus } = this;
      console.log(recordStatus);
      if (recordStatus == 0) {
        this.recordStatus = 1;
        this.startRecording();
      } else if (recordStatus == 1) {
        this.recordStatus = 2;
        this.stopRecord();
      } else if (recordStatus == 2) {
        // this.obtainRecord();
        this.audio.play();
      }
    },
    // 关闭弹出框
    choseModal() {
      this.modalShow = false;
    },
    //开始录音
    startRecording() {
      this.countTimes = setInterval(() => {
        this.times++;
      }, 800);
      var recorder;
      if (recorder) {
        recorder.start();
        return;
      }
      HZRecorder.get(
        rec => {
          recorder = rec;
          this.newRecorder = rec;
          this.newRecorder.start();
          this.showed = false;
          this.hiddened = true;
          this.showedHid = true;
        },
        { error: this.$options.methods.showError }
      );
    },
    //显示错误信息
    showError(msg) {
      var ct;
      $(".error").html(msg);
      clearTimeout(ct);
      ct = setTimeout(function() {
        $(".error").html("");
      }, 3000);
    },
    //  获取录音信息
    obtainRecord() {
      console.log(this.newRecorder);
      if (!this.newRecorder) {
        this.$options.methods.showError("请先录音");
        return;
      }
      var record = this.newRecorder.getBlob();
      if (record.duration !== 0) {
        let that = this;
        console.log(record.blob);
        this.audioBlob = record.blob;
        let obj_url = window.URL.createObjectURL(record.blob);
        this.audio = new Audio();
        this.audio.src = obj_url;
        // this.audio.play();
        console.log(this.audio);
      } else {
        this.$options.methods.showError("请先录音");
      }
    },
    // 停止录音
    stopRecord() {
      clearInterval(this.countTimes);
      this.obtainRecord();
    },
    // 删除录音
    cancelRecording() {
      this.times = 0;
      this.recordStatus = 0;
      this.audio = "";
    }
  }
};
</script>
<style lang="less" scoped>
.post-message {
  width: 100%;
  // position: fixed;
  // left: 0;
  // bottom: 0;
  .pm-header {
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem;
    box-sizing: border-box;
    margin-bottom: 0.33rem;
    > div {
      display: flex;
      align-items: center;
    }
    > div:nth-of-type(1) {
      color: #23d2cd;
      img {
        width: 0.33rem;
        display: inline-block;
        margin-right: 0.2rem;
      }
    }
    .choose {
      img {
        width: 0.26rem;
      }
      .radio-text {
        color: #b5b5b5;
      }
      > div:nth-of-type(2) {
        margin-left: 0.5rem;
      }
    }
  }
  .pm-bottom {
    box-shadow: 0px -2px 30px 0px rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    .pm-tab {
      display: flex;
      justify-content: space-between;
      height: 1rem;
      align-items: center;
      padding: 0 0.3rem;
      box-sizing: border-box;
      > div {
        width: 20%;
        height: 0.49rem;
        position: relative;
        display: flex;
        justify-content: center;
        > img {
          width: 0.49rem;
        }
        > input {
          position: absolute;
          width: 0.49rem;
          height: 0.49rem;
          opacity: 0;
        }
      }
    }
    .pm-content {
      height: 4.34rem;
      .time {
        text-align: center;
        font-size: 0.38rem;
        padding-top: 0.3rem;
      }
      .record {
        position: relative;
        color: #323232;
        font-size: 0.24rem;
        text-align: center;
        .before-recording {
          width: 2.1rem;
          display: block;
          margin: 0.29rem auto;
        }
        .record-button {
          width: 0.7rem;
          position: absolute;
          top: 0.75rem;
        }
        .cancel {
          left: 1.4rem;
        }
        .confirm {
          right: 1.4rem;
        }
      }
    }
  }
  .pm-modal {
    position: fixed;
    z-index: 5;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 5.4rem;
    height: 3.05rem;
    background: #ffffff;
    border-radius: 0.18rem;
    .pm-modal-header {
      position: relative;
      font-size: 0.32rem;
      text-align: center;
      height: 0.94rem;
      line-height: 0.94rem;
      border-bottom: 1px solid #f5f5f5;
      img {
        position: absolute;
        width: 0.26rem;
        top: 0.3rem;
        right: 0.18rem;
      }
    }
    .pm-modal-input {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.28rem;
      width: 4.8rem;
      margin: 0.3rem auto 0;
      height: 0.6rem;
      border-radius: 0.18rem;
      border: 1px solid #b5b5b5;
      > input {
        width: 4.05rem;
        padding-left: 0.1rem;
      }
      > i {
        display: block;
        flex: 1;
        border-left: 1px solid #f5f5f5;
      }
      img {
        width: 0.32rem;
        display: block;
        margin: 0 auto;
      }
    }
    button {
      width: 2rem;
      display: block;
      margin: 0.3rem auto 0;
      height: 0.6rem;
      background: #23d2cd;
      border-radius: 0.3rem;
      font-size: 0.28rem;
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>
<style lang="less" >
.pm-bottom {
  .van-uploader {
    width: 100%;
    .van-uploader__input-wrapper {
      width: 100%;
    }
  }
}
</style>