<template>
  <div class="at-me-group">
<!--    <div class="at-me-item" v-for="(item,index) in atMeInfo" :key="index">-->
<!--      <div class="photo">-->
<!--        <img class="photo-img" :src="item.profilePicture" alt="头像">-->
<!--      </div>-->
<!--      <div class="content-main">-->
<!--        <div class="content-header">-->
<!--          <div class="username">{{item.username}}（{{item.anonymousUsername}}）</div>-->
<!--          <div class="usernameTail">{{item.usernameTail}}</div>-->
<!--        </div>-->
<!--        <div class="content-middle clear">-->
<!--          <img class="content-img left" :src="item.contentImg" alt="帖子图片">-->
<!--          <div class="content-middle-right left">-->
<!--            <div class="atMyName">@{{item.myUsername}}（{{item.myAnonymousUsername}}）</div>-->
<!--            <div class="comment">{{item.comment}}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="content-footer">-->
<!--          {{item.time}}-->
<!--          <i class="icon"></i>-->
<!--          回复-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <message-item :messageInfo="messageInfo"/>
  </div>
</template>
<script>
import messageItem from '@/components/MessageItem.vue'
export default {
  components: {
    messageItem
  },
  mixins: [],
  name: '',
  data () {
    return {
      messageInfo: [
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '山鬼',
          anonymousUsername: '九月',
          usernameTail: '在帖子中@了我',
          contentImg: '/static/images/message/whispers.png',
          time: '1小时前',
          myUsername: '小玉',
          myAnonymousUsername: '玉兔',
          comment: '可真有来世，只愿升平早奏，韶华...'
        },
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '摸鱼',
          anonymousUsername: '七月',
          usernameTail: '在帖子中@了我',
          contentImg: '/static/images/message/whispers.png',
          time: '2小时前',
          myUsername: '小玉',
          myAnonymousUsername: '玉兔',
          comment: '可真有来世，只愿升平早奏，韶华...'
        }
      ]
    }
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  mounted () {},
  created () {},
  filters: {},
  directives: {},
  beforeDestroy () {},
  destroyed () {}
}
</script>
<style scoped lang="less">
  .at-me-group {
    background-color: #ffffff;
    .at-me-item {
      height: 2.90rem;
      width: 100%;
      display: flex;
    }
    .photo {
      width: 1.24rem;
      height: 1.86rem;
      margin: 0.1rem 0 0 0.25rem;
      .photo-img {
        max-width: 0.8rem;
      }
    }
    .content-main {
      border-bottom: 0.01rem solid #F5F5F5;
      flex-grow: 1;
    }
    .content-header {
      font-size: 0.28rem;
      margin-top: 0.3rem;
      display: flex;
      font-family:PingFangSC-Medium;
      font-weight:500;
      .username{
        color: #323232;
      }
      .usernameTail{
        color: #B5B5B5;
      }
    }
    .content-middle {
      display: flex;
      width: 5.8rem;
      height: 1.26rem;
      background-color: #F7F7F7;
      margin-top: 0.2rem;
      font-size: 0.28rem;
      font-family:PingFang-SC-Medium;
      .content-img{
        max-height: 1.26rem;
      }
      .content-middle-right{
        flex-grow: 1;
        margin: 0.2rem 0 0 0.2rem;
        font-size: 0.24rem;
        .atMyName{
          color: #323232;
          font-weight:500;
        }
        .comment {
          margin-top: 0.2rem;
          color: #B5B5B5;
        }
      }
    }
    .content-footer {
      margin-top: 0.2rem;
      font-size: 0.24rem;
      color: #B5B5B5;
      .icon {
        margin-left: 0.3rem;
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
