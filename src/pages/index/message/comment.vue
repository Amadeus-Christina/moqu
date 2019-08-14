<template>
  <div class="comment-group">
    <div class="comment-item" v-for="(item,index) in commentInfo" :key="index">
      <div class="photo">
        <img class="photo-img" :src="item.profilePicture" alt="头像">
      </div>
      <div class="content-main">
        <div class="content-header">
          <div class="username">{{item.username}}（{{item.anonymousUsername}}）</div>
          <div class="usernameTail">{{item.usernameTail}}</div>
        </div>
        <div class="content-middle">
          回复
          <span class="atName">@{{item.atName}}</span>
          {{item.contentMiddle}}
        </div>
        <div class="content-footer">
          {{item.time}}
          <i class="icon"></i>
          回复
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
      commentInfo: [
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '山鬼',
          anonymousUsername: '九月',
          usernameTail: '回复了我的评论',
          atName: '烈烈龙',
          content: '大兄弟很稳的',
          time: '1小时前'
        },
        {
          profilePicture: '/static/images/message/Anonymouscomments.png',
          username: '摸鱼',
          anonymousUsername: '七月',
          usernameTail: '回复了我的评论',
          atName: '烈烈龙',
          content: '大兄弟很不稳',
          time: '2小时前'
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
  .comment-group {
    background-color: #ffffff;
    .comment-item {
      height: 2.03rem;
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
      .username{
        color: #323232;
      }
      .usernameTail{
        color: #B5B5B5;
      }
    }
    .content-middle {
      margin-top: 0.2rem;
      font-size: 0.28rem;
      font-family:PingFang-SC-Medium;
      .atName {
        color: #23D2CD;
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
