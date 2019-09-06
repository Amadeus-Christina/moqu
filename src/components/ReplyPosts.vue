<template>
  <div :class="['reply-posts',isMoreFunctions?'active':'']">
    <div class="reply-posts-box">
      <p style="font-size:.14rem" v-show="replyMessage.name||pillowTalk||anonymousComments">
        {{pillowTalk}} {{anonymousComments}} 回复：{{replyMessage.name? replyMessage.floor+' '+replyMessage.name:'楼主'}}
        <img
          v-show="replyMessage.name"
          src="../../static/images/ForumPosts/Shutdown.png"
          alt
          @click="shutDown"
        />
      </p>
      <div class="rpb-box">
        <div class="rpb-right">
          <img src="../../static/images/ForumPosts/xie.png" alt v-if="!showFocus" />
          <div
            contenteditable="true"
            placeholder="我来说两句"
            @focus="showFocusFn"
            @blur="closeFocusFn"
            v-html="innerText"
            @input="changeText"
            ref="textVal"
          ></div>
        </div>
        <div class="send" v-if="showFocus">
          <span @click.stop="sengMessage">发送</span>
        </div>
        <div class="rpb-left" @click="moreFunctions" v-if="!showFocus">
          <img src="../../static/images/ForumPosts/MoreandmoreII.png" alt />
        </div>
      </div>
    </div>
    <div class="rpb-bottom">
      <ul>
        <li>
          <img src="../../static/images/ForumPosts/photo.png" alt />
          <p>照片</p>
        </li>
        <li>
          <img src="../../static/images/ForumPosts/voicebtn.png" alt />
          <p>发送语音</p>
        </li>
        <li @click.stop="anonymousCommentsFn">
          <img src="../../static/images/ForumPosts/Anonymouscomments.png" alt />
          <p>匿名评论</p>
        </li>
        <li @click.stop="pillowTalkFn">
          <img src="../../static/images/ForumPosts/whispers.png" alt />
          <p>悄悄话</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getReleaseComments } from "@/api/home/home";
import { Toast } from "vant";
export default {
  data() {
    return {
      isMoreFunctions: false,
      showFocus: false,
      postDetailsData: {},
      type: 0, //	0是普通评论  1是悄悄话, 3回复
      userId: 1,
      innerText: this.value,
      isLocked: false,
      content: "",
      whetherAnonymous: 2, //1是，2不是,
      anonymousComments: "",
      isAnonymousComments: false,
      pillowTalk: "",
      isPillowTalk: false
    };
  },
  computed: {
    ...mapState(["replyMessage", "postDetails"]),
    message() {
      console.log(this.replyMessage);
      return this.replyMessage;
    }
  },

  methods: {
    ...mapMutations(["CLICK_REPLY"]),
    moreFunctions() {
      this.isMoreFunctions = !this.isMoreFunctions;
    },
    shutDown() {
      this.CLICK_REPLY("");
      this.type = 0;
    },
    showFocusFn() {
      this.showFocus = true;
      this.isLocked = true;
    },
    closeFocusFn() {
      if (this.content) {
        this.showFocus = true;
      } else {
        this.showFocus = false;
      }
      this.isLocked = false;
    },
    sengMessage() {
      //userId, postId, replyText, replyAudio, type, respondent, whetherAnonymous, beReplyId, replyImg
      if (this.replyMessage.replyId && this.type == 0) {
        this.type = 3;
      }
      console.log(this.whetherAnonymous)
      getReleaseComments(
        this.userId,
        this.postDetailsData.postDTO.postId,
        this.content,
        "",
        this.type,
        this.replyMessage.userId ? this.replyMessage.userId : "",
        this.whetherAnonymous,
        this.replyMessage.replyId ? this.replyMessage.replyId : "",
        ""
      )
        .then(res => {
          if (res.code == 200) {
            Toast.clear();
            Toast({
              message: "经验+2",
              icon: "https://img.yzcdn.cn/vant/logo.png"
            });

            this.$refs.textVal.innerHTML = "";
            this.content=''
            this.$emit("childByValue", true);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeText(e) {
      this.content = this.$refs.textVal.innerHTML;
    },
    anonymousCommentsFn() {
      if (this.isAnonymousComments) {
        this.anonymousComments = "匿名";
        this.whetherAnonymous = 1;
        this.isAnonymousComments = !this.isAnonymousComments;
      } else {
        this.anonymousComments = "";
        this.whetherAnonymous = 2;
        this.isAnonymousComments = !this.isAnonymousComments;
      }
    },
    pillowTalkFn() {
      if (this.isPillowTalk) {
        this.pillowTalk = "悄悄地";
        this.type = 1;
        this.isPillowTalk = !this.isPillowTalk;
      } else {
        this.pillowTalk = "";
        this.type = 0;
        this.isPillowTalk = !this.isPillowTalk;
      }
    }
  },
  watch: {
    value() {
      if (!this.isLocked && !this.innerText) {
        this.innerText = this.value;
        console.log(this.innerText);
      }
    }
  },
  components: {},
  created() {
    this.postDetailsData = this.postDetails;
  },
  destroyed () {
    this.CLICK_REPLY("");
  }
};
</script>

<style lang="less" scoped>
.rpb-right {
  display: flex;
  padding: 0 0.3rem;
  width: 5.71rem;
  height: auto;
  background: rgba(243, 243, 243, 1);
  border-radius: 0.3rem;
  justify-content: center;
  align-items: center;
  img {
    width: 0.19rem;
    height: 0.21rem;
  }
  div {
    background: none;
    font-size: 0.24rem;
    font-weight: 400;
    color: #444444;
    flex: 1;
    padding: 0 0.21rem;
    word-wrap: break-word;
    word-break: break-all;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
.reply-posts-box {
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 1px 0.1rem 0px rgba(128, 128, 128, 0.4);
  p {
    font-size: 0.12rem;
    padding: 0.1rem 0.3rem;
    margin-top: -0.2rem;
    img {
      width: 0.2rem;
      height: auto;
      vertical-align: middle;
      margin-left: 0.2rem;
    }
  }
  .rpb-left {
    display: flex;
    margin-left: 0.5rem;
    img {
      width: 0.48rem;
      height: 0.48rem;
    }
  }
}
.rpb-bottom {
  padding: 0.3rem;
  background: #fff;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 0.7rem;
        height: 0.7rem;
        margin-bottom: 0.23rem;
      }
      p {
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(181, 181, 181, 1);
      }
    }
  }
}
.reply-posts {
  position: fixed;
  bottom: -1.85rem;
  transition: all 0.5s ease-in-out;
  width: 100%;
  &.active {
    bottom: -0.01rem;
  }
}
.rpb-box {
  display: flex;
}
.send {
  width: 0.99rem;
  height: 0.49rem;
  background: rgba(35, 210, 205, 1);
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.2rem;
  span {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
