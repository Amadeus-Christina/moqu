<template>
  <div>
    <ForumPosts :postItems="postItems" :particularsType="particularsType" :isSkip="false">
      <template v-slot:header>
        <div @click="isAttentionBtn">
          <div class="attention-box" v-show="!isAttention">
            <p>关注</p>
          </div>
          <div class="followed-box" v-show="isAttention">
            <p>已关注</p>
          </div>
        </div>
      </template>
    </ForumPosts>
    <Comment></Comment>
    <ReplyPosts @childByValue="childByValue"></ReplyPosts>
  </div>
</template>

<script>
import ForumPosts from "@/components/ForumPosts";
import Comment from "@/components/Comment";
import ReplyPosts from "@/components/ReplyPosts";
import { Toast } from "vant";
import {
  getPostReply,
  getAddPageViews,
  getAddAttention,
  getCancelAttention
} from "@/api/home/home";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      postItems: {},
      isAttention: false,
      particularsType: true,
      postDetails1: {},
      userId: 1
    };
  },

  methods: {
    ...mapMutations(["POST_DETAILS"]),
    isAttentionBtn() {
      console.log(this.isAttention);
      if (this.isAttention) {
        getCancelAttention(this.userId, this.postItems.userId)
          .then(res => {
            if (res.code == 200) {
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.isAttention = false;
      } else {
        getAddAttention(this.userId, this.postItems.userId)
          .then(res => {
            if (res.code == 200) {
              Toast({
                message: "关注成功",
                icon: "../../../../static/images/ForumPosts/Releasesuccess.png",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
        this.isAttention = true;
      }
    },
    childByValue(data) {
      if (data) {
        this.getPostReplyFn();
      }
    },
    getPostReplyFn() {
      let { postId } = this.$route.query;
      getPostReply(this.userId, postId) //userId为1
        .then(res => {
          this.postItems = res.data.postDTO;
          this.postDetails1 = res.data;
          this.isAttention = res.data.attentionStatus ? true : false;
          this.POST_DETAILS(res.data);
          localStorage.setItem("postDetails", JSON.stringify(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    ForumPosts,
    Comment,
    ReplyPosts
  },
  computed: {
    ...mapState(["postDetails"])
  },
  created() {
    let { postId } = this.$route.query;
    getAddPageViews(1, postId) //userId为1
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
    this.getPostReplyFn();
  }
};
</script>

<style lang="less" scoped>
.attention-box {
  width: 0.99rem;
  height: 0.49rem;
  background: rgba(35, 210, 205, 1);
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.followed-box {
  width: 0.99rem;
  height: 0.49rem;
  background: rgba(188, 188, 188, 1);
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
