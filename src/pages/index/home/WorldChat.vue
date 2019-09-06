<template>
  <div class="world-chat-box">
    <div class="wcb-top">
      <ul>
        <li v-for="(item,index) in chatList" :key="index">
          <div class="wcbt-time" v-if="item.time">
            <span>{{item.time}}</span>
          </div>
          <div class="wcbt-others" v-if="item.userId&&item.userId!=userId">
            <div class="wcbto-pic">
              <img :src="item.headImg" alt />
            </div>
            <div class="wcbto-text">
              <div class="wcbto-name">
                <p>{{item.realNickName}}（{{item.anonymous}}）</p>
              </div>
              <div class="wcbto-talk">
                <p :style="{color:item.color}">{{item.content}}</p>
              </div>
            </div>
          </div>
          <div class="wcbt-oneself" v-if="item.userId==userId">
            <div class="wcbton-text">
              <div class="wcbton-name">
                <p>{{item.realNickName}}（{{item.anonymous}}）</p>
              </div>
              <div class="wcbton-talk">
                <p :style="{color:item.color}">{{item.content}}</p>
              </div>
            </div>
            <div class="wcbton-pic">
              <img :src="item.headImg" alt />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="wcb-bottom">
      <div class="reply-posts-box">
        <div class="rpb-box">
          <div class="rpb-right">
            <img src="../../../../static/images/ForumPosts/xie.png" alt v-if="!showFocus" />
            <input
              type="text"
              placeholder="说点什么~"
              @focus.stop="showFocusFn($event)"
              @blur.stop="closeFocusFn($event)"
              v-model="message"
              :style="{color:allSpeechColor[selectColorIndex]?allSpeechColor[selectColorIndex].speechColorRgb:''}"
            />
          </div>
          <div class="send" v-if="showFocus" @click.stop="send">
            <span>发送</span>
          </div>
          <div class="rpb-left" @click.stop="moreFunctions" v-if="!showFocus">
            <img src="../../../../static/images/ForumPosts/MoreandmoreII.png" alt />
          </div>
        </div>
      </div>

      <div class="rpb-bottom">
        <ul>
          <li
            v-for="(item,index) in allSpeechColor"
            :key="item.speechColorId"
            :data-id="item.speechColorId"
            :data-color="item.speechColorRgb"
            :data-expendDiamondNumber="item.expendDiamondNumber"
            @click.stop="selectColor($event,index)"
            :style="{background:item.speechColorRgb}"
          >
            <span :class="index==selectColorIndex?'active-text':''">A</span>
          </li>
        </ul>
      </div>
    </div>
     <PopUp @isShutDownFn="shutDownFn" @isConfirmFn="confirmFn" v-if="isShow" :btnText="'立即充值'">
      <template v-slot:content>
        <p class="btn-text">发送失败，您的钻石不足</p>
      </template>
    </PopUp>
  </div>
</template>

<script>
import { getAllSpeechColor, getSendWorldChatPost } from "@/api/home/home";
import { Toast } from "vant";
import PopUp from "@/components/PopUp";
export default {
  data() {
    return {
      userId: 1,
      showFocus: false,
      isMoreFunctions: false,
      selectColorIndex: 0,
      allSpeechColor: [],
      websocket: "",
      message: "",
      chatList: [],
      path: "",
      clearTime: 0,
      isShow:true
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted(el) {
        el.focus();
      },
      inserted(el) {
        el.blur();
      }
    }
  },
  components: {
    PopUp
  },
  created() {
    let num = Math.round(Math.random() * 4);
    this.userId = num;
    this.path = "wss://lvyou.shouwangs.com/webSocket/" + this.userId;
    getAllSpeechColor()
      .then(res => {
        this.allSpeechColor = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    if ("WebSocket" in window) {
      this.websocket = new WebSocket(this.path);
      this.initWebSocket();
      this.showTime();
    } else {
      console.log("当前浏览器 Not support websocket");
    }
  },
  beforeDestroy() {
    this.onbeforeunload();
  },
  methods: {
    moreFunctions() {
      this.isMoreFunctions = !this.isMoreFunctions;
    },
    showFocusFn(e) {
      this.showFocus = true;
    },
    closeFocusFn(e) {
      if (this.message) {
        this.showFocus = true;
      } else {
        this.showFocus = false;
      }
    },
    selectColor(e, index) {
      this.selectColorIndex = index;
    },

    initWebSocket() {
      //连接错误
      this.websocket.onerror = this.setErrorMessage;

      // //连接成功
      this.websocket.onopen = this.setOnopenMessage;

      //收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      //连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload;
    },
    setErrorMessage() {
      this.data =
        "WebSocket连接发生错误" + "   状态码：" + this.websocket.readyState;
    },
    setOnopenMessage() {
      this.data =
        "WebSocket连接成功" + "   状态码：" + this.websocket.readyState;
      let timeObj = {};
      timeObj.time = new Date().toLocaleTimeString();
      this.chatList.push(timeObj);
    },
    setOnmessageMessage(event) {
      this.data = "服务端返回：" + event.data;
      this.chatList.push(JSON.parse(event.data));
    },
    setOncloseMessage() {
      this.data =
        "WebSocket连接关闭" + "   状态码：" + this.websocket.readyState;
    },
    onbeforeunload() {
      this.closeWebSocket();
    },

    //websocket发送消息
    send() {
      console.log(this.websocket.readyState);
      let params = {};
      params.userId = this.userId;
      params.speechColorId = this.allSpeechColor[
        this.selectColorIndex
      ].speechColorId;
      params.content = this.message;
      getSendWorldChatPost(params.content, params.userId, params.speechColorId)
        .then(res => {
          console.log(res);
          //500为发送失败  10008为砖石不足   10009为有敏感词
          if (res.code == 200) {
            this.message = "";
          } else if (
            res.code == 500 ||
            res.code == 10008 ||
            res.code == 10009
          ) {
            Toast.fail(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    closeWebSocket() {
      this.websocket.close();
    },
    showTime() {
      let that = this;
      this.clearTime = setInterval(function() {
        let timeObj = {};
        timeObj.time = new Date().toLocaleTimeString();
        that.chatList.push(timeObj);
        console.log(that.chatList);
      }, 300000);
    }
  },
  destroyed() {
    clearInterval(this.clearTime);
    this.closeWebSocket();
  }
};
</script>

<style lang="less" scoped>
.wcb-top {
  padding: 0 0.3rem;
}
.wcbt-time {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.33rem;
  margin: 0.41rem 0;
  span {
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.wcbt-others {
  display: flex;
  margin: 0.4rem 0;
}
.wcbto-pic {
  display: flex;
  margin-right: 0.2rem;
  img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
}
.wcbto-name {
  margin-bottom: 0.2rem;
  p {
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(181, 181, 181, 1);
  }
}
.wcbto-talk {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 0px 0.4rem 0.4rem 0.4rem;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-all;
  p {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(35, 210, 205, 1);
  }
}
.wcbt-oneself {
  display: flex;
  justify-content: flex-end;
  margin: 0.4rem 0;
}
.wcbton-pic {
  display: flex;
  margin-left: 0.2rem;
  img {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
  }
}
.wcbton-name {
  margin-bottom: 0.2rem;
  text-align: right;
  p {
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(181, 181, 181, 1);
  }
}
.wcbton-talk {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.4rem 0 0.4rem 0.4rem;
  padding: 0.2rem 0.4rem;
  box-sizing: border-box;
  word-wrap: break-word;
  word-break: break-all;
  p {
    font-size: 0.28rem;
    font-weight: 400;
    color: rgba(35, 210, 205, 1);
  }
}
.rpb-right {
  display: flex;
  padding: 0 0.3rem;
  width: 5.71rem;
  background: rgba(243, 243, 243, 1);
  border-radius: 0.3rem;
  justify-content: center;
  align-items: center;
  img {
    width: 0.19rem;
    height: 0.21rem;
  }
  input {
    background: none;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(165, 165, 165, 1);
    flex: 1;
    padding: 0 0.21rem;
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
    flex-wrap: wrap;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 0.8rem;
      height: 0.5rem;
      border-radius: 0.08rem;
      margin: 0.13rem 0.21rem 0.13rem 0;
      background: red;
      &:nth-of-type(7n) {
        margin-right: 0;
      }
      span {
        display: none;
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        &.active-text {
          display: block;
        }
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
.wcb-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.btn-text {
  text-align: center;
  font-size: 0.28rem;
  padding: 0.3rem 0;
}
</style>
