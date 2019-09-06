<template>
  <div class="attention-box">
    <ul>
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

    <tabBar></tabBar>
    <PopUp :title="'购买推广'" @isShutDownFn="shutDownFn" v-show="isGgeneralize">
      <template v-slot:content>
        <div class="ggeneralize-box">
          <p>您愿意花费1000钻石推广此帖子吗？</p>
        </div>
      </template>
    </PopUp>
  </div>
</template>

<script>
import tabBar from "@/components/TabBar";
import ForumPosts from "@/components/ForumPosts";
import PopUp from "@/components/PopUp";
import { getQueryAllPost } from "@/api/home/home";
import BScroll from "better-scroll";
import { Toast } from "vant";
export default {
  data() {
    return {
      postList: [],
      isActiveShow: false,
      isActive: Number,
      isGgeneralize: false,
      currentPage: 1,
      pageSize: 4,
      userId: 1,
      count: 0,
       noMore: false,
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
      console.log(e);
      this.$router.push({ path: "/index/report", query: { userId: 1 } });
    },
    goGgeneralize(e) {
      this.isGgeneralize = true;
    },
    shutDownFn(data) {
      this.isGgeneralize = data;
    },
    loadData() {
      Toast.loading({
        mask: true,
        message: "加载中...",
        duration: 0,
        mask: false
      });
       getQueryAllPost(this.pageSize,this.currentPage,'',this.userId, '',1)
        .then(res => {
          if (res.code === 200) {
            this.postList = this.postList.concat(res.data.data);
            Toast.clear();
            this.scroll.refresh();
            this.scroll.finishPullUp();
          }
        })
        .catch(err => {
          Toast("请求失败");
          console.log(err);
        });
    }
  },
  components: {
    tabBar,
    ForumPosts,
    PopUp
  },
  created() {
      Toast.loading({
      mask: true,
      message: "加载中...",
      duration: 0,
      mask: false
    });
    //pageSize, currentPage, postPlate, userId, postId, isAttention
    getQueryAllPost(this.pageSize,this.currentPage,'',this.userId, '',1)
      .then(res => {
        console.log(res)
         Toast.clear();
          this.postList = res.data.data;
          this.count = res.data.count;
      })
      .catch(err => {
         Toast.clear();
      });
  },
   mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll('.attention-box', {
        pullUpLoad: {
          threshold: -50 // 在上拉到超过底部 50px 时，触发 pullingUp 事件
        },
        click: true
      });
      this.scroll.on("pullingUp", () => {
        ++this.currentPage;
        console.log(this.count)
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
.fpt-right {
  position: relative;
}
.attention-box {
  margin-top: -1.64rem;
  height:calc(100% - 2.5rem);
  overflow: hidden;
  ul{
    background: #F7F7F7;
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
.ggeneralize-box {
  padding: 0.4rem 0;
  p {
    text-align: center;
    font-size: 0.28rem;
    font-weight: 500;
    color: rgba(66, 66, 66, 1);
  }
}
</style>
