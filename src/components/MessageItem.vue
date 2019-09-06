<template>
  <div class="message-item-group">
    <div class="blank" v-if="messageInfo == undefined || messageInfo.length <=0 ">
      <div class="container">
        <img class="container-img" src="../../static/images/message/nocontent.png" alt="无评论"/>
        <div class="text">还没有消息哦～</div>
      </div>
    </div>
    <div class="message-item" v-else v-for="(item,index) in messageInfo" :key="index">
      <div class="photo">
        <img v-if="isWishpers" class="photo-img" src="../../static/images/message/Headportrait.png">
        <img v-else-if="isAtMe" class="photo-img" :src="item.headImg">
        <img v-else class="photo-img" :src="item.head_img || item.user.headImg">
      </div>
      <div class="content-main">
        <div class="content-header">
          <div class="username" v-if="isWishpers">悄悄地</div>
          <div class="username" v-else-if="item.headImg">{{item.realNickName}}({{item.value}})</div>
          <div class="username" v-else>{{item.real_nick_name || item.user.realNickName}}({{item.anonymous  || item.user.value}})</div>
          <div class="usernameTail">
            <span v-if="isAtMe && item.status == 0">@了我</span>
            <span v-if="isAtMe && item.status == 1">在帖子中@了我</span>
            {{usernameTail}}
            <span v-if="usernameTail === '点赞了我的' && item.user.beLikeType == '1'">帖子</span>
            <span v-if="usernameTail === '点赞了我的' && item.user.beLikeType == '2'">评论</span>
          </div>
        </div>
        <div class="content-middle">
          <div class="content-middle-comment" v-if="usernameTail === '回复了我的评论'">
            回复
            <span class="atName">@{{item.real_nick_name2}}</span>
            {{item.reply_text || item.reply.replyText}}
          </div>
          <div class="content-middle-good" v-if="usernameTail === '点赞了我的'">
            <span v-if="usernameTail === '点赞了我的' && item.user.beLikeType == '1'">{{item.post.postText}}</span>
            <span v-if="usernameTail === '点赞了我的' && item.user.beLikeType == '2'">{{item.reply.replyText}}</span>
          </div>
          <div class="content-middle-at-me clear" v-if="isAtMe">
            <img class="content-img left" :src="item.postImg" alt="帖子图片">
            <div class="content-middle-right left">
              <div class="atMyName">@{{$store.state.userInfo.realNickName}}({{$store.state.userInfo.anonymous}})</div>
              <div class="comment">{{item.postText}}</div>
            </div>
          </div>
        </div>
        <div class="content-footer">
          <span v-if="isAtMe">{{item.createTime}}</span>
          <span v-else>{{item.time || item.time3 || item.user.time2 }}</span>
          <span v-if="usernameTail === '回复了我的评论'">
            <i class="icon"></i>
            回复
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  mixins: [],
  name: '',
  data () {
    return {
    }
  },
  props: ['messageInfo','usernameTail','isWishpers','isAtMe'],
  computed: {},
  watch: {},
  methods: {},
  mounted () {
  },
  created () {
    console.log('this.messageInfo',this.messageInfo);
  },
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .message-item-group {
    background-color: #ffffff;
    .blank {
      .container{
        height: 3rem;
        width: 2.5rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.5rem;
        margin-left: -1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .container-img {
          max-width: 2rem;
        }
        .text {
          font-size: 0.24rem;
          color: #B5B5B5;
        }
      }
    }
    .message-item {
      /*height: 2.03rem;*/
      width: 100%;
      display: flex;
    }
    .photo {
      width: 1.24rem;
      height: 1.86rem;
      margin: .1rem 0 0 .25rem;
      .photo-img {
        max-width: .8rem;
      }
    }
    .content-main {
      border-bottom: .01rem solid #F5F5F5;
      flex-grow: 1;
    }
    .content-header {
      font-size: .28rem;
      margin-top: .3rem;
      display: flex;
      font-family:PingFangSC-Medium;
      .username{
        color: #323232;
        margin-right: 0.1rem;
      }
      .usernameTail{
        color: #B5B5B5;
      }
    }
    .content-middle-comment,
    .content-middle-good {
      margin-top: .2rem;
      font-size: .28rem;
      font-family:PingFang-SC-Medium;
      .atName {
        color: #23D2CD;
      }
    }
    .content-middle-at-me {
      display: flex;
      width: 5.8rem;
      height: 1.26rem;
      background-color: #F7F7F7;
      margin-top: .2rem;
      font-size: .28rem;
      font-family:PingFang-SC-Medium;
      .content-img{
        max-height: 1.26rem;
      }
      .content-middle-right{
        flex-grow: 1;
        margin: .2rem 0 0 .2rem;
        font-size: .24rem;
        .atMyName{
          color: #323232;
          font-weight:500;
        }
        .comment {
          margin-top: .2rem;
          color: #B5B5B5;
        }
      }
    }
    .content-footer {
      margin-top: .2rem;
      font-size: .24rem;
      color: #B5B5B5;
      padding-bottom: .2rem;
      .icon {
        margin-left: .3rem;
        display: inline-block;
        width: 0.25rem;
        height: 0.25rem;
        background-image: url("/static/images/message/comments.png");
        background-position: center center;
        background-size: 0.25rem 0.25rem;
        vertical-align: middle;
      }
    }
  }
</style>
