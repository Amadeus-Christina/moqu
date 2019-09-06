<template>
  <div class="comment-big-box">
    <div class="cb-header">
      <ul>
        <li @click="switchLike">
          <img
            :src="isSwitchLike?'../../static/images/ForumPosts/good_on.png':'../../static/images/ForumPosts/good.png'"
            alt
          />
          <b :class="isSwitchLike?'activeColor':''">{{postLikeCount}}</b>
        </li>
        <li>
          <img
            :src="isComment?'../../static/images/ForumPosts/comments_on.png':'../../static/images/ForumPosts/comments.png'"
            alt
          />
          <b :class="isComment?'activeColor':''">{{postCommentCount}}</b>
        </li>
        <li @click="addCollect()">
          <img
            :src="isCollect?'../../static/images/ForumPosts/collection_on.png':'../../static/images/ForumPosts/collection.png'"
          />
          <b :class="isCollect?'activeColor':''">{{collectionCount}}</b>
        </li>
        <li @click="watchLou" v-if="userId!=beUserId">
          <img
            :src="isLou?'../../static/images/ForumPosts/house_on.png':'../../static/images/ForumPosts/house.png'"
            alt
          />
        </li>
        <li>
          <img src="../../static/images/ForumPosts/more.png" alt @click.stop="moreAndMore" />
          <div :class="['more-box',isActiveShow?'activeShow':'']">
            <p>我要推广</p>
            <p
              @click="goReport($event)"
              :data-post-id="postDetailsData.postDTO?postDetailsData.postDTO.postId:''"
            >举报</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="mar-bottom">
      <div
        v-for="(item,index) in postReplyVos"
        :key="index"
        @click.stop="replyWho('#'+(index+1)+'楼',item.realNickName+'('+item.anonymous+')',item.replyId,item.userId)"
        @touchstart.stop="beUserId==userId&&gotouchstart(index)"
        @touchmove.stop="gotouchmove"
      >
        <div class="fp-top" v-if="item.type!=1" v-show="!isLou||item.isMaster==1">
          <div
            :class="['fpt-pic',index==showPicIndex?'active-pic':'']"
            @click.stop="clickDelete(index)"
          >
            <img src="../../static/images/ForumPosts/delete.png" alt />
          </div>
          <div class="fpt-left">
            <div class="fpt-header">
              <img :src="item.headImg" alt />
              <b v-if="item.isMaster==1">楼主</b>
            </div>
          </div>
          <div class="fpt-right">
            <div class="fptr-top">
              <div class="fpt-name">
                <div class="fptn-top">
                  <p v-if="item.whetherAnonymous==2">
                    {{item.realNickName}}
                    <span>({{item.anonymous}})</span>
                  </p>
                  <p v-if="item.whetherAnonymous==1">
                    <span>{{item.anonymous}}</span>
                  </p>
                  <p>LV{{item.grade}}</p>
                  <ul>
                    <li>
                      <img src="../../static/images/ForumPosts/vip.png" alt />
                    </li>
                  </ul>
                </div>
                <div class="fptn-bottom">
                  <p>#{{index+1}}楼</p>
                  <p>{{item.createTime}}</p>
                </div>
              </div>
              <div class="fpt-transpond">
                <img src="../../static/images/ForumPosts/ToreportII.png" alt />
                <div class="good-pic-box" @click.stop="isGood(index,item.replyId)">
                  <img
                    :src="item.status==1?'../../static/images/ForumPosts/goodI_on.png':'../../static/images/ForumPosts/goodI.png'"
                    alt
                  />
                  <span :class="item.status==1?'active-blue':''">{{item.replyLike}}</span>
                </div>
              </div>
            </div>
            <div class="fptr-bottom">
              <div v-if="item.type==3" class="beReply-text">
                <div v-if="item.beReplyWhetherAnonymous==2">
                  回复：{{item.beReplyRealNickName}}
                  <span>({{item.beReplyAnonymous}})</span>：
                  <span v-html="item.replyText"></span>
                </div>
                <div v-if="item.beReplyWhetherAnonymous==1">
                  回复：
                  <span>{{item.beReplyAnonymous}}</span>：
                  <span v-html="item.replyText"></span>
                </div>
              </div>
              <p v-if="item.type==0" v-html="item.replyText"></p>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="delete-box" v-if="showDelete">
      <div class="delete-bg"></div>
      <div class="delete-text-box">
        <div @click.stop="confirmDeletion">确认删除此评论不可恢复</div>
        <div @click.stop="undelete">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  getLikeReply,
  getAddCollection,
  getCancelCollection,
  getAddLike,
  getCancelLike,
  getDeletePostReply
} from "@/api/home/home";
import { Toast } from "vant";
export default {
  data() {
    return {
      isSwitchLike: true,
      isComment: true,
      isCollect: false,
      isLou: false,
      status: false,
      timeOutEvent: 0, //定时器
      showPicIndex: null,
      showDelete: false,
      postDetailsData: [],
      postReplyVos: [],
      collectionCount: null,
      postLikeCount: null,
      postCommentCount: null,
      likeStatus: null,
      collectStatus: null,
      userId: 1,
      beUserId: null, //帖子楼主
      isActiveShow: false,
      deleteReplyId: null //删除评论
    };
  },
  methods: {
    ...mapMutations(["CLICK_REPLY"]),
    moreAndMore() {
      this.isActiveShow = !this.isActiveShow;
    },
    switchLike() {
      let beLikePostId = JSON.parse(localStorage.getItem("postDetails")).postDTO
        .postId;
      let beLikeUserId = JSON.parse(localStorage.getItem("postDetails")).postDTO
        .userId;
      if (!this.isSwitchLike) {
        getAddLike(1, beLikePostId, beLikeUserId) //此处1为userId
          .then(res => {
            if (res.code == 200) {
              this.isSwitchLike = true;
              console.log(this.isSwitchLike);
              this.postLikeCount += 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        getCancelLike(1, beLikePostId) //此处1为userid
          .then(res => {
            if (res.code == 200) {
              this.isSwitchLike = false;
              console.log(this.isSwitchLike);
              this.postLikeCount -= 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    addCollect() {
      let beLikePostId = JSON.parse(localStorage.getItem("postDetails")).postDTO
        .postId;
      if (!this.isCollect) {
        getAddCollection(1, beLikePostId) //此处1为userid
          .then(res => {
            if (res.code == 200) {
              Toast({
                message: "收藏成功",
                icon: "../../static/images/ForumPosts/Collectionofsuccess.png",
                duration: 1000
              });

              this.isCollect = true;
              this.collectionCount += 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        getCancelCollection(1, beLikePostId) //此处1为userid
          .then(res => {
            if (res.code == 200) {
              this.isCollect = false;
              this.collectionCount -= 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

      this.isCollect = !this.isCollect;
    },
    watchLou() {
      this.isLou = !this.isLou;
    },
    isGood(index, replyId) {
      //此时1为useid
      clearTimeout(this.timeOutEvent);
      this.showPicIndex = null;
      getLikeReply(1, replyId)
        .then(res => {
          if (this.postReplyVos[index].status == 1) {
            this.postReplyVos[index].status = 2;
            this.postReplyVos[index].replyLike -= 1;
          } else {
            this.postReplyVos[index].status = 1;
            this.postReplyVos[index].replyLike += 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotouchstart(index) {
      let that = this;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(function() {
        //执行长按要执行的内容，
        that.showPicIndex = index;

        clearTimeout(that.timeOutEvent);
      }, 2000); //这里设置定时
    },
    //手释放，如果在2秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    replyWho(floor, name, replyId, userId) {
      clearTimeout(this.timeOutEvent);
      this.showPicIndex = null;
      if (this.timeOutEvent != 0) {
        this.CLICK_REPLY({
          name: name,
          floor: floor,
          replyId: replyId,
          userId: userId
        });
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
    clickDelete(index) {
      this.showDelete = true;
      this.deleteReplyId = this.postReplyVos[this.showPicIndex].replyId;
    },
    confirmDeletion() {
      clearTimeout(this.timeOutEvent);
      getDeletePostReply(1, this.deleteReplyId)
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
      this.postReplyVos.splice(this.showPicIndex, 1);
      this.showPicIndex = null;
      this.showDelete = false;
    },
    undelete() {
      this.showDelete = false;
    },
    createdFn() {
      this.postDetailsData = this.postDetails;
      this.beUserId = this.postDetails.postDTO.userId;
      this.isSwitchLike = this.postDetailsData.likeStatus == 0 ? true : false;
      this.isCollect = this.postDetailsData.collectStatus == 0 ? true : false;
      this.isComment = this.postDetailsData.commentStatus == 0 ? true : false;
      this.postReplyVos = this.postDetailsData.postReplyVos;
      this.collectionCount = this.postDetailsData.collectionCount;
      this.postLikeCount = this.postDetailsData.postLikeCount;
      this.postCommentCount = this.postDetailsData.postCommentCount;
    }
  },
  computed: {
    ...mapState(["postDetails"])
  },
  watch: {
    postDetails(newval) {
      this.createdFn();
    }
  },
  components: {},
  created() {
    this.createdFn();
  },
  destroyed() {
    this.replyWho("", "");
  }
};
</script>

<style lang="less" scoped>
.comment-big-box {
  background: #fff;
}
.cb-header {
  ul {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0.3rem;
    li {
      display: flex;
      align-items: center;
      &:nth-last-of-type(1) {
        position: relative;
      }
      b {
        &.activeColor {
          color: #23d2cd !important;
        }
      }
    }
    li:nth-of-type(1) {
      img {
        width: 0.33rem;
        height: 0.33rem;
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
        width: 0.4rem;
        height: 0.33rem;
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
        width: 0.33rem;
        height: 0.31rem;
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
        width: 0.36rem;
        height: auto;
        margin-right: 0.21rem;
      }
    }
    li:nth-of-type(5) {
      img {
        width: 0.34rem;
        height: 0.22rem;
        margin-right: 0.21rem;
      }
    }
  }
}
.fp-top {
  display: flex;
  align-items: flex-start;
  padding: 0.3rem 0.3rem 0 0.3rem;
  position: relative;
  .fpt-pic {
    position: absolute;
    bottom: -0.5rem;
    left: 40%;
    display: none;
    &.active-pic {
      display: block;
    }
    img {
      width: 1.6rem;
      height: auto;
    }
  }
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
        width: 100%;
        height: auto;
        border-radius: 50%;
      }
      b {
        color: #fff;
        background: #ffb000;
        position: absolute;
        top: 0.75rem;
        margin: 0 auto;
        font-size: 0.14rem;
        border-radius: 0.05rem;
        padding: 0 0.05rem;
        box-sizing: border-box;
      }
    }
  }

  .fpt-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f7f7f7;
    .fpt-name {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 0.9rem;
      .fptn-top {
        display: flex;
        align-items: baseline;
        p:nth-of-type(1) {
          font-size: 0.3rem;
          font-weight: 500;
          color: rgba(50, 50, 50, 1);
          margin-right: 0.2rem;
        }
        p:nth-of-type(2) {
          font-size: 0.24rem;
          font-weight: 500;
          color: rgba(35, 210, 205, 1);
          margin-right: 0.1rem;
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

    .fpt-transpond {
      display: flex;
      align-items: baseline;
      justify-content: center;
      .good-pic-box {
        display: flex;
        align-items: center;
        justify-content: start;
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(181, 181, 181, 1);
        margin-left: 0.32rem;
        img {
          width: 0.28rem;
          height: 0.27rem;
          margin-right: 0.04rem;
        }
        span {
          &.active-blue {
            color: #23d2cd;
          }
        }
      }
      img {
        width: 0.29rem;
        height: 0.27rem;
      }
    }
  }
}
.fptr-top {
  display: flex;
  justify-content: space-between;
}
.fptr-bottom {
  .beReply-text {
    font-size: 0.28rem;
    padding: 0.21rem;
  }
  p {
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(66, 66, 66, 1);
    padding: 0.21rem;
  }
}
.mar-bottom {
  margin-bottom: 3.5rem;
}
.delete-box {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: 99;
  .delete-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }
  .delete-text-box {
    position: fixed;
    bottom: 0.2rem;
    width: 7.1rem;
    height: 1.6rem;
    border-radius: 0.16rem;
    overflow: hidden;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    div:nth-of-type(1) {
      background: #fff;
      font-size: 0.28rem;
      font-weight: 500;
      color: rgba(254, 72, 60, 1);
      line-height: 0.8rem;
    }
    div:nth-of-type(2) {
      background: #e3e3e3;
      font-size: 0.28rem;
      font-weight: 500;
      color: #ffffff;
      line-height: 0.8rem;
    }
  }
}
.more-box {
  position: absolute;
  right: -3rem;
  top: 0.4rem;
  width: 2.6rem;
  height: 1.56rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -0.02rem 0.3rem 0px rgba(0, 0, 0, 0.05);
  border-radius: 0.04rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.3rem;
  transition: all 0.5s ease-in;
  z-index: 20;
  &.activeShow {
    right: -0.3rem;
  }
  p {
    font-size: 0.24rem;
    font-weight: 500;
    color: rgba(50, 50, 50, 1);
    margin: 0.15rem 0;
  }
}
</style>
