<template>
  <div class="big-box">
    <div ref="wrapper" class="list-wrapper">
      <ul class="ab-post">
        <li v-for=" (item,index) in postList" :key="index">
          <ForumPosts :postItems="item">
            <template v-slot:header>
              <div class="fpt-right">
                <div class="fpt-transpond" @click="moreAndMore(index)">
                  <img src="../../../../static/images/ForumPosts/Moreandmore.png" alt />
                </div>
                <div :class="['more-box',isActive==index&&isActiveShow?'activeShow':'']">
                  <p>我要推广</p>
                  <p @click="goReport($event)" :data-post-id="item.postId">举报</p>
                </div>
              </div>
            </template>
          </ForumPosts>
        </li>
        <van-divider dashed v-if="noMore">暂无更多</van-divider>
      </ul>
    </div>
    <tabBar></tabBar>
    <PopUp @isShutDownFn="shutDownFn" @isConfirmFn="confirmFn" v-if="isShow">
      <template v-slot:content>
        <p class="btn-text">非会员不可进入此贴</p>
      </template>
    </PopUp>
  </div>
</template>

<script>
import tabBar from "@/components/TabBar";
import ForumPosts from "@/components/ForumPosts";
import { getQueryAllPost } from "@/api/home/home";
import PopUp from "@/components/PopUp";
import { Toast } from "vant";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      postList: [],
      isActiveShow: false,
      isActive: Number,
      currentPage: 1,
      pageSize: 4,
      userId: 1,
      count: 0,
      noMore: false,
      postType: 3,
      isShow: false
    };
  },
  methods: {
    moreAndMore(i) {
      console.log(this.isActive, i);
      if (this.isActive == i) {
        this.isActiveShow = false;
        this.isActive = null;
      } else {
        this.isActiveShow = true;
        this.isActive = i;
      }
    },
    goReport(e) {
      this.$router.push({
        path: "/index/report",
        query: { postId: e.target.dataset.postId }
      });
    },
    loadData() {
      //pageSize, currentPage, postPlate, userId, postId, isAttention
      getQueryAllPost(
        this.pageSize,
        this.currentPage,
        this.postType,
        this.userId,
        "",
        2
      )
        .then(res => {
          if (res.code === 200) {
            this.postList = this.postList.concat(res.data.data);
          }
        })
        .catch(err => {
          Toast.clear();
          Toast("请求失败");
          console.log(err);
        });
    },
    confirmFn(data) {
      if (data) {
      }
      this.$router.go(-1);
    }
  },
  components: {
    tabBar,
    ForumPosts,
    PopUp
  },
  created() {
    let whetherMember=1
    if (whetherMember == 1) {
      this.isShow = true;
    }
    getQueryAllPost(4, 1, 3, 1, "", 2) //依据接口  需调整
      .then(res => {
        if (res.code == 200) {
          this.postList = res.data.data;
          this.count = res.data.count;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  updated() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        scrollY: true,
        pullUpLoad: {
          threshold: -50 // 在上拉到超过底部 50px 时，触发 pullingUp 事件
        }
      });
      this.scroll.on("pullingUp", () => {
        ++this.currentPage;
        console.log("拉动了");
        console.log(this.currentPage);
        if (Math.ceil(this.count / this.pageSize) >= this.currentPage) {
          this.loadData();
        } else {
          this.noMore = true;
        }
      });
    });
  }
};
</script>

<style lang="less" scoped>
.big-box {
  height: 100%;
}
.fpt-right {
  position: relative;
}
.attention-box {
  margin-top: -1.64rem;
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
.list-wrapper {
  height: 100%;
  overflow: hidden;
  ul {
    padding-bottom: 1.1rem;
  }
}
.hot-box {
  height: calc(100% - 2.95rem);
  display: flex;
  flex-direction: column;
}
.btn-text {
  text-align: center;
  font-size: 0.28rem;
  padding: 0.3rem 0;
}
</style>
