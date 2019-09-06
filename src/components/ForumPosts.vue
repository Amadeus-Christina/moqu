<template>
  <div class="forum-posts-box">
    <div class="fp-top">
      <div class="fpt-left">
        <div class="fpt-header" v-if="postItems.headImg">
          <img :src="postItems.headImg" alt />
          <b>{{postItems.experienceGrade}}</b>
        </div>
        <div class="fpt-name">
          <div class="fptn-top">
            <p
              v-if="postItems.whetherAnonymous==2"
              :class="postItems.whetherMember==2?'activeBlue':''"
            >{{postItems.realNickName}}({{postItems.anonymous}})</p>
            <p
              v-else-if="postItems.whetherAnonymous==1"
              :class="postItems.whetherMember==2?'activeBlue':''"
            >{{postItems.anonymous}}</p>
            <p class="generalize">推广</p>
            <ul>
              <li v-for="(item,index) in postItems.userModal" :key="index">
                <img :src="item.medalUrl" alt />
              </li>
            </ul>
          </div>
          <div class="fptn-bottom">
            <p>@{{postItems.postId}}</p>
            <p>{{postItems.timeDifference||postItems.createTime}}</p>
            <p v-if="postItems.postPlate==1">#同城</p>
            <p v-else-if="postItems.postPlate==2">#自拍</p>
            <p v-else-if="postItems.postPlate==3">#日出联盟</p>
            <p v-else>#电音节</p>
          </div>
        </div>
      </div>
      <slot name="header"></slot>
    </div>
    <div class="fp-middle" @click="isSkip&&goDynamicDetails(postItems.postId)">
      <div class="fpm-text">
        <p v-html="changePostText"></p>
      </div>
      <div class="fpm-img" v-if="postItems.images">
        <!-- 图片结构 -->
        <ul>
          <li
            v-for="(item,index) in postItems.images"
            :key="index"
            :class="postItems.length>4?'imgwidth':''"
          >
            <img :src="item" alt />
          </li>
        </ul>
      </div>
      <!-- 视频结构 -->
      <div class="fpm-video" @click.stop="playVideo" v-if="postItems.postVideo">
        <video
          :src="postItems.postVideo"
        ></video>
        <div class="video-play" v-if="!isVideo">
          <img src="../../static/images/ForumPosts/bofan 00.png" alt />
        </div>
      </div>
      <!-- 音频结构 -->
      <div class="fpm-audio" v-if="postItems.postAudio">
        <audio
          controls
          src="../../static/images/ForumPosts/语音 001_sd.m4a"
          @canplay="getDuration"
          @timeupdate="updateTime"
          ref="audio"
        ></audio>
        <div class="fpma-bg" @click.stop="currentSong">
          <div></div>
          <p>{{duration}}s</p>
        </div>
      </div>
      <div class="fpm-location">
        <img src="../../static/images/ForumPosts/location.png" alt />
        <p>{{postItems.postPosition}}</p>
      </div>
    </div>
    <div class="fp-bottom" v-if="!particularsType">
      <ul>
        <li>
          <img src="../../static/images/ForumPosts/read.png" alt />
          <b>{{postItems.browseCount}}</b>
        </li>
        <li @click.stop="switchLike(1,postItems.postId,postItems.userId)">
          <!--此处有userid-->
          <img
            :src="isSwitchLike?'../../static/images/ForumPosts/good_on.png':'../../static/images/ForumPosts/good.png'"
            alt
          />
          <b :class="isSwitchLike?'activeColor':''">{{postItems.postLikeCount}}</b>
        </li>
        <li>
          <img
            :src="isComment?'../../static/images/ForumPosts/comments_on.png':'../../static/images/ForumPosts/comments.png'"
            alt
          />
          <b :class="isComment?'activeColor':''">{{postItems.postCommentCount}}</b>
        </li>
        <li>
          <img
            :src="postItems.postDiamonds?'../../static/images/ForumPosts/exceptional_on.png':'../../static/images/ForumPosts/exceptional.png'"
            alt
          />
          <b :class="postItems.postDiamonds?'activeYellow':''">{{postItems.postDiamonds}}</b>
        </li>
      </ul>
    </div>
    <div class="fp-bottom-particulars" v-if="particularsType" @click.stop="isShutDownFn">
      <img src="../../static/images/ForumPosts/exceptionalI.png" alt />
      <p>
        收到打赏
        <i>{{postItems.appreciationSum}}</i>钻石
      </p>
    </div>
    <PopUp :title="'打  赏'" @isShutDownFn="shutDownFn" v-show="isShutDown" @isConfirmFn="confirmFn">
      <template v-slot:content>
        <div class="pub-content">
          <div class="pay-money">
            <input type="number" maxlength="7" placeholder="请输入" v-model="inputVal" />
            <img src="../../static/images/ForumPosts/diamondI.png" alt />
          </div>
        </div>
      </template>
    </PopUp>
  </div>
</template>
<script>
import PopUp from "@/components/PopUp";
import {
  getAddLike,
  getCancelLike,
  getAppreciationPost
} from "@/api/home/home";
import { Toast } from "vant";
export default {
  data() {
    return {
      isSwitchLike: false,
      isComment: true,
      isVideo: false,
      isShutDown: false,
      inputVal: "",
      duration: null,
      timer: 0
    };
  },
  props: {
    postItems: {
      type: Object
    },
    particularsType: {
      type: Boolean
    },
    isSkip: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    switchLike(userId, beLikePostId, beLikeUserId) {
      console.log(userId, beLikePostId, beLikeUserId);
      if (!this.isSwitchLike) {
        getAddLike(userId, beLikePostId, beLikeUserId)
          .then(res => {
            if (res.code == 200) {
              this.isSwitchLike = true;
              this.postItems.postLikeCount = this.postItems.postLikeCount + 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        getCancelLike(userId, beLikePostId)
          .then(res => {
            if (res.code == 200) {
              this.isSwitchLike = false;
              this.postItems.postLikeCount = this.postItems.postLikeCount - 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    playVideo() {
      let videoplay = document.querySelector(".fpm-video video");
      if (this.isVideo) {
        videoplay.pause();
        this.isVideo = !this.isVideo;
      } else {
        videoplay.play();
        this.isVideo = !this.isVideo;
      }
    },
    isShutDownFn() {
      this.isShutDown = true;
    },
    shutDownFn(data) {
      this.isShutDown = data;
    },
    confirmFn(data) {
      if (data) {
        getAppreciationPost(1, this.postItems.postId, this.inputVal)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.isShutDown = false;
              this.postItems.appreciationSum += +this.inputVal;
              this.inputVal = "";
              Toast({
                message: "谢谢老板",
                icon: "../../static/images/ForumPosts/Exceptionalsuccess.png",
                duration: 1000
              });
            }
            if (res.code == 10888) {
              Toast({
                message: "余额不足，请充值！",
                icon: "../../static/images/ForumPosts/Exceptionalsuccess.png",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goDynamicDetails(postId) {
      this.$router.push({
        path: "/index/dynamic-details",
        query: { postId: postId }
      });
    },
    // message(e) {
    //   let { value } = e.target;
    //   if (value.length > 9) value = value.slice(0, 9);
    //   this.inputVal = value;
    // },
    getDuration() {
      // console.log(this.$refs.audio.duration); //此时可以获取到duration
      this.duration = Math.ceil(this.$refs.audio.duration);
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime; //获取audio当前播放时间
    },
    currentSong() {
      let that = this;
      //监听正在播放的歌曲改变
      this.$refs.audio.play();
      clearInterval(that.timer)
      this.timer = setInterval(function() {
        if (that.duration <= 0) {
          clearInterval(that.timer);
        } else {
          that.duration = that.duration - 1;
        }
        console.log(that.duration)
      }, 1000);
    }
  },
  watch: {
    currentSong() {
      //监听正在播放的歌曲改变
      this.$nextTick(() => {
        console.log(this.$refs.audio.duration); //此时duration为NaN
      });
    },
    inputVal() {
      console.log(this.inputVal);
      if (this.inputVal.length > 8) {
        this.inputVal = this.inputVal.slice(0, 8);
      } else {
        this.inputVal;
      }
    }
  },
  components: {
    PopUp
  },
  computed: {
    changePostText() {
      let str = this.postItems.postText;
      return str;
    }
  },
  created() {
    this.isSwitchLike = this.postItems.isLike == 0 ? true : false;
    this.isComment = this.postItems.isComment == 0 ? true : false;
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less"  scoped>
.forum-posts-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  padding: 0.3rem;
  margin-bottom: 0.2rem;
  .fp-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .fpt-left {
      display: flex;
      .fpt-header {
        width: 0.9rem;
        height: 0.9rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.1rem;
        position: relative;
        img {
          border-radius: 50%;
          width: 100%;
          height: auto;
        }
        b {
          font-weight: 400;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          right: 0;
          height: 0.35rem;
          width: 0.35rem;
          border-radius: 50%;
          background: #ffc824;
          font-size: 0.12rem;
          color: #fff;
          border: 2px solid #fff;
          text-align: center;
          line-height: 0.3rem;
        }
      }
      .fpt-name {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 0.9rem;
        .fptn-top {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          p:nth-of-type(1) {
            font-size: 0.3rem;
            font-weight: 500;
            color: rgba(50, 50, 50, 1);
            margin-right: 0.2rem;
          }
          p:nth-of-type(2) {
            // font-size: 0.24rem;
            // font-weight: 500;
            // color: rgba(35, 210, 205, 1);
            // margin-right: 0.1rem;
          }
          .generalize {
            font-size: 0.24rem;
            font-weight: 500;
            color: #fff;
            margin-right: 0.1rem;
            width: 0.76rem;
            height: 0.4rem;
            background: rgba(35, 210, 205, 1);
            border-radius: 0.04rem;
            text-align: center;
            line-height: 0.4rem;
          }
          ul {
            display: flex;
            align-items: center;
            li {
              display: flex;
              width: 0.27rem;
              height: 0.27rem;
              margin-right: 0.1rem;
              img {
                width: 100%;
              }
            }
          }
        }
        .fptn-bottom {
          display: flex;
          p {
            font-size: 0.24rem;
            font-weight: 500;
            color: #b5b5b5;
            margin-right: 0.25rem;
          }
        }
      }
    }
    .fpt-transpond {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.39rem;
      height: 0.33rem;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .fp-middle {
    margin-bottom: 0.2rem;
    .fpm-text {
      font-size: 0.28rem;
      font-weight: 500;
      color: rgba(66, 66, 66, 1);
      line-height: 0.4rem;
      margin: .2rem 0;
    }
    .fpm-img {
      ul {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 0.2rem;
        li {
          width: 2.7rem;
          height: 2.7rem;
          border-radius: 0.08rem;
          margin-right: 0.1rem;
          margin-bottom: 0.1rem;
          &.imgwidth {
            width: 2.23rem;
            height: 2.23rem;
            border-radius: 0.08rem;
            margin-right: 0.1rem;
            margin-bottom: 0.1rem;
            &:nth-of-type(3) {
              margin-right: 0;
            }
            &:nth-of-type(6) {
              margin-right: 0;
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .fpm-video {
      position: relative;
      video {
        max-width: 100%;
        height: auto;
      }
      .video-play {
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
    .fpm-audio {
      position: relative;
      audio {
        visibility: hidden;
      }
      .fpma-bg {
        position: absolute;
        top: 0;
        width: 4.7rem;
        height: 1.3rem;
        background: url("../../static/images/ForumPosts/bg_music.png") no-repeat;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: start;
        z-index: 10;
        p {
          font-size: 0.32rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          margin-left: 0.3rem;
        }
        div {
          margin-left: 0.4rem;
          height: 0.51rem;
          width: 0.45rem;
          display: flex;
          align-items: center;
          justify-content: start;
          background-image: url("../../static/images/ForumPosts/voice.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          img {
            height: 100%;
          }
        }
      }
    }
    .fpm-location {
      display: flex;
      img {
        width: 0.33rem;
        height: 100%;
        margin-right: 0.2rem;
      }
      p {
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(35, 210, 205, 1);
        line-height: 0.33rem;
      }
    }
  }
  .fp-bottom {
    ul {
      display: flex;
      justify-content: space-between;
      li {
        display: flex;
        align-items: center;
        b {
          &.activeColor {
            color: #23d2cd !important;
          }
          &.activeYellow {
            color: #ffc824 !important;
          }
        }
      }
      li:nth-of-type(1) {
        img {
          width: 0.45rem;
          height: 0.26rem;
          margin-right: 0.11rem;
        }
        b {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(194, 194, 194, 1);
        }
      }
      li:nth-of-type(2) {
        img {
          width: 0.31rem;
          height: 0.32rem;
          margin-right: 0.23rem;
        }
        b {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(194, 194, 194, 1);
        }
      }
      li:nth-of-type(3) {
        img {
          width: 0.39rem;
          height: 0.32rem;
          margin-right: 0.21rem;
        }
        b {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(194, 194, 194, 1);
        }
      }
      li:nth-of-type(4) {
        img {
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 0.21rem;
        }
        b {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(194, 194, 194, 1);
        }
      }
    }
  }
}
.fp-bottom-particulars {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 0.7rem;
    height: 0.7rem;
    margin-bottom: 0.3rem;
  }
  p {
    display: flex;
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(181, 181, 181, 1);
    i {
      color: #ffc824;
    }
  }
}
.activeBlue {
  color: #23d2cd !important;
}
</style>