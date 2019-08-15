<template>
  <div class="message-item-group">
    <div class="message-item" v-for="(item,index) in messageInfo" :key="index">
      <div class="photo">
        <img class="photo-img" :src="item.profilePicture" alt="头像">
      </div>
      <div class="content-main">
        <div class="content-header">
          <div class="username">{{item.username}}（{{item.anonymousUsername}}）</div>
          <div class="usernameTail">{{item.usernameTail}}</div>
        </div>
        <div class="content-middle">
          <div class="content-middle-comment" v-if="item.usernameTail === '回复了我的评论'">
            <div>
              回复
              <span class="atName">@{{item.atName}}</span>
              {{item.content}}
            </div>
          </div>
          <div class="content-middle-at-me" v-if="item.usernameTail === '在帖子中@了我'">
            <div class="clear">
              <img class="content-img left" :src="item.contentImg" alt="帖子图片">
              <div class="content-middle-right left">
                <div class="atMyName">@{{item.myUsername}}（{{item.myAnonymousUsername}}）</div>
                <div class="comment">{{item.comment}}</div>
              </div>
            </div>
          </div>
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
    return {}
  },
  props: ['messageInfo'],
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
  .message-item-group {
    background-color: #ffffff;
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
      }
      .usernameTail{
        color: #B5B5B5;
      }
    }
    .content-middle-comment {
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
