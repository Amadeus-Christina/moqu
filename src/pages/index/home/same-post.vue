<template>
  <div class="sp">
    <header class="sp-header">
      <span>记录这一刻，晒给更懂你的人</span>
      <span @click="clickRelease">发布</span>
    </header>
    <div class="sp-edit">
      <v-edit-div v-model="callText" class="sp-content" v-if="isRouterAlive"></v-edit-div>
      <section class="sp-img">
        <div v-for="(item,index) in imgList" :key="index">
          <img :src="item" />
          <img
            src="../../../../static/images/home/cancel.png"
            class="cancel"
            @click="delIndex('img',index)"
          />
        </div>
      </section>
      <section class="sp-video">
        <div v-for="(item,index) in videoList" :key="index">
          <video :src="item" controls></video>
          <img
            src="../../../../static/images/home/cancel.png"
            class="cancel"
            @click="delIndex('video',index)"
          />
        </div>
      </section>
      <section class="sp-audio">
        <div>
          <section class="audio-block">
            <img src="../../../../static/images/home/voiceII.png" alt />
            <span>60s</span>
          </section>
          <img
            src="../../../../static/images/home/cancel.png"
            class="audio-cancel"
            @click="delIndex('audio')"
          />
        </div>
      </section>
    </div>
    <postMessage
      ref="postMessage"
      @listenImg="listenImgFromChild"
      @listenVideo="listenVideoFromChild"
      @listenRecording="listenRecordingFromChild"
    ></postMessage>

    <van-action-sheet v-model="actionSheetShow" round :actions="actions" @select="onSelect" />
  </div>
</template>
<script>
import { release, savePostDraft, findPostDraft } from "@/api/home/index.js";
import { upload } from "@/api/index/index.js";
import postMessage from "@/components/PostMessage.vue";
import { resolve } from "q";
import { mapState, mapMutations } from "vuex";
import vEditDiv from "@/components/DivContenteditable.vue";

export default {
  components: {
    postMessage,
    vEditDiv
  },
  name: "samePost",
  // provide() {
  //   return {
  //     reload: this.reload
  //   };
  // },
  data() {
    return {
      isRouterAlive: true,
      active: 0,
      icon: [],
      // imgList: [],
      // videoList: [],
      audioUrl: "",
      actionSheetShow: false,
      actions: [
        { name: "保存草稿", color: "#23D2CD" },
        { name: "不保存", color: "#FE483C" },
        { name: "取消", color: "#fff", className: "e3" }
      ],
      postDraft: false,
      userId: 1,
      postPlate:''
    };
  },
  // 判断从哪个页面进入
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let f5 = from.name == "location" || from.name == "contact";
      if (f5) {
        next();
      } else {
        vm.showPostDraft();
        next();
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    let { callText, imgList, videoList, postDraft } = this;
    let isValue = callText || imgList.length > 0 || videoList.length > 0;
    // 判断编辑器是否存在内容
    if (isValue) {
      let actionSheethide =
        to.name == "location" || to.name == "contact" || postDraft == true;
      if (!actionSheethide) {
        this.actionSheetShow = true;
        next(false);
      } else {
        if (postDraft == true) {
          // 退回上一页，清空数据
          this.CALL("");
          this.IMGLIST([]);
          this.VIDEOLIST([]);
          this.reload();
        }
        next();
      }
    } else {
      next();
    }
  },
  created(){
    this.postPlate = this.$route.query.postPlate
  },
  computed: {
    ...mapState(["positioning", "imgList", "videoList"]),
    callText: {
      get() {
        return this.$store.state.call;
      },
      set(newVal) {
        this.$store.commit("CALL", newVal);
      }
    }
  },
  methods: {
    ...mapMutations(["CALL", "IMGLIST", "VIDEOLIST"]),
    // 重新刷新编辑器组件
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
    // 删除图片或视频,音频
    delIndex(what, index) {
      console.log(index);
      if (what == "img") {
        this.imgList.splice(index, 1);
        this.IMGLIST(this.imgList);
      } else if (what == "audio") {
        console.log("audio");
      } else {
        this.videoList.splice(index, 1);
        this.VIDEOLIST(this.videoList);
      }
    },
    // 图片
    async listenImgFromChild(value) {
      let formData = new FormData();
      let { imgList, videoList } = this;
      if (videoList.length > 0) {
        this.$toast("图片或语音或视频只能上传其中的一种");
        return;
      }
      if (imgList.length + value.length > 9) {
        this.$toast("图片上传不能超过9张");
        return;
      }
      for (let i = 0; i < value.length; i++) {
        formData.append(
          "file",
          value[i],
          "file_" + Date.parse(new Date()) + ".jpg"
        );
      }
      let imgUrl = await this.upFile(this, formData);
      imgUrl = imgUrl.split(",");
      this.IMGLIST([...this.imgList, ...imgUrl]);
      console.log(this.imgList);
    },
    // 视频
    async listenVideoFromChild(value) {
      let { imgList, videoList } = this;
      if (imgList.length > 0) {
        this.$toast("图片或语音或视频只能上传其中的一种");
        return;
      }
      if (videoList.length + value.length > 1) {
        this.$toast("视频上传不能超过一个");
        return;
      }
      let formData = new FormData();
      for (let i = 0; i < value.length; i++) {
        formData.append(
          "file",
          value[i],
          "file_" + Date.parse(new Date()) + ".mp4"
        );
      }
      let videoUrl = await this.upFile(this, formData);
      this.VIDEOLIST([...this.videoList, videoUrl]);
      // console.log(videoUrl);
    },
    // 音乐
    async listenRecordingFromChild(value) {
      let formData = new FormData();
      formData.append("file", value, "file_" + Date.parse(new Date()) + ".M4A");
      let audioUrl = await this.upFile(this, formData);
      this.audioUrl = audioUrl;
    },
    // 点击发布
    clickRelease() {
      // 获取span标签的内容
      let spanReg = /<a[^>]+>/g;
      let spanContent = this.callText.match(spanReg);
      // console.log(spanContent);
      let tzStringArray = [];
      let mzStringArray = [];
      if (spanContent) {
        spanContent.forEach(item => {
          // 匹配帖子Id
          let tzReg = /tz="\d*"/g;
          if (item.match(tzReg)) {
            tzStringArray = [...tzStringArray, ...item.match(tzReg)];
          }
          // 匹配名字，获取userId
          let mzReg = /<a mz="\d"/g;
          if (item.match(mzReg)) {
            mzStringArray = [...mzStringArray, ...item.match(mzReg)];
          }
        });
      }
      // 匹配其中有数字的
      let numReg = /\d+/g;
      let tz = [];
      tzStringArray.forEach(item => {
        console.log(item.match(numReg));
        tz = [...tz, parseInt(...item.match(numReg))];
      });
      let mz = [];
      mzStringArray.forEach(item => {
        mz = [...mz, parseInt(...item.match(numReg))];
      });
      let { stickChecked, nickNameChecked, money } = this.$refs.postMessage;
      console.log(money);
      let {
        userId,
        positioning,
        callText,
        imgList,
        videoList,
        postPlate,
        audioUrl
      } = this;
      if (!positioning) {
        this.$toast("请确定你的位置");
        return;
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      let data = {
        userId,
        postPosition:
          positioning.city + positioning.area ||
          (positioning.addressComponents &&
            positioning.addressComponents.city +
              positioning.addressComponents.district),
        postText: callText,
        postPlate,
        whetherTopping: stickChecked ? 1 : 2,
        postDiamonds: 0,
        whetherAnonymous: nickNameChecked ? 1 : 2,
        postVideo: videoList.join(","),
        postAudio: "",
        userList: mz.join(","),
        postList: tz.join(","),
        postImg: imgList.join(",")
      };
      release(data).then(res => {
        if (res.code == 200) {
          console.log(this.callText);
          this.CALL("");
          this.IMGLIST([]);
          this.VIDEOLIST([]);
          this.reload();
          console.log(this.callText);
          this.$toast.clear();
          this.$toast("发布成功");
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 下拉弹出框选择哪个
    onSelect(item) {
      console.log(item.name);
      if (item.name == "保存草稿") {
        this.savePostDraft();
      } else if (item.name == "不保存") {
        this.postDraft = true;
        this.actionSheetShow = false;
        console.log(this.postDraft);
        this.$router.go(-1);
      } else {
        this.actionSheetShow = false;
      }
    },
    // 保存草稿
    savePostDraft() {
      let { userId, callText, imgList, videoList,postPlate } = this;
      let { stickChecked, nickNameChecked, money } = this.$refs.postMessage;
      let data = {
        userId,
        postPosition: "",
        postText: callText,
        postPlate,
        whetherTopping: stickChecked ? 1 : 2,
        postDiamonds: 0,
        whetherAnonymous: nickNameChecked ? 1 : 2,
        postImg: imgList.join(","),
        postVideo: videoList,
        postAudio: ""
      };
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      savePostDraft(data).then(res => {
        if (res.code == 200) {
          this.$toast.clear();
          this.$toast("保存成功");
          this.postDraft = true;
          this.$router.go(-1);
        } else {
          this.$toast(res.msg);
        }
      });
    },
    // 发帖的时候回显草稿
    showPostDraft() {
      let { userId } = this;
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中..."
      });
      findPostDraft(userId).then(res => {
        if (res.code == 200) {
          let postDraft = res.data;
          if (postDraft) {
            if (postDraft.postText) {
              this.CALL(postDraft.postText);
            }
            if (postDraft.postImg) {
              this.IMGLIST(postDraft.postImg.split(","));
            }
            if (postDraft.postVideo) {
              this.VIDEOLIST(postDraft.postVideo.split(","));
            }
          }
          this.$toast.clear();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    upFile(that, formData) {
      return new Promise(resolve => {
        that.$toast.loading({
          duration: 0,
          forbidClick: true,
          message: "加载中..."
        });
        upload(that, formData).then(res => {
          if (res.data.code == 0) {
            resolve(res.data.data);
            that.$toast.clear();
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sp {
  display: flex;
  flex-direction: column;
  height: 100%;
  .sp-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    height: 0.79rem;
    line-height: 0.79rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    border-top: 1px solid #f5f5f5;
    box-shadow: 0px -2px 30px 0px rgba(0, 0, 0, 0.05);
    > span:nth-of-type(1) {
      color: #b5b5b5;
    }
    > span:nth-of-type(2) {
      color: #23d2cd;
    }
  }
  .sp-edit {
    flex: 1;
    padding-bottom: 1rem;
    padding: 0.3rem;
    box-sizing: border-box;
    .sp-img,
    .sp-video,
    .sp-audio {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.3rem;
      div {
        position: relative;
        .audio-block {
          width: 4.3rem;
          height: 0.9rem;
          background: linear-gradient(
            90deg,
            rgba(0, 200, 240, 1) 0%,
            rgba(30, 218, 212, 1) 100%
          );
          border-radius: 0.45rem;
          display: flex;
          align-items: center;
          font-size: 0.32rem;
          color: #fff;
          img {
            width: 0.35rem;
            height: auto;
            display: block;
            margin: 0 0.3rem 0 0.4rem;
          }
        }
        .audio-cancel {
          width: 0.4rem;
          height: auto;
          position: absolute;
          right: -0.7rem;
          top: 0.15rem;
        }
        .cancel {
          width: 0.4rem;
          height: auto;
          position: absolute;
          right: -0.2rem;
          top: -0.2rem;
        }
        img {
          width: 1.5rem;
          height: auto;
          margin: 0.1rem;
        }
        video {
          width: 100%;
          height: auto;
        }
      }
    }
    .sp-content {
      font-size: 0.28rem;
      color: #323232;
    }
    .sp-content:empty::before {
      content: attr(placeholder);
      font-size: 14px;
      color: #b5b5b5;
      line-height: 21px;
      // padding-top: 10px;
    }
  }
}
.e3 {
  background: #e3e3e3;
}
</style>